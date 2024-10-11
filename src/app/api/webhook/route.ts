import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const planId = session?.metadata?.planId;

    if (event.type === "checkout.session.completed") {
        if (!userId || !planId) {
            return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }

        const stripeSubscription = session.subscription as string;

        await db.subscription.create({
            data: {
                userId: userId,
                planId: planId,
                stripeSubscriptionId: stripeSubscription,
                status: "active",
            },
        });
    } else if (event.type === "invoice.payment_succeeded") {
        const invoice = event.data.object as Stripe.Invoice;
        const userId = invoice.metadata.userId;

        await db.invoice.create({
            data: {
                userId: userId,
                stripeInvoiceId: invoice.id,
                amount: invoice.amount_paid / 100,
                status: invoice.status,
            },
        });
    } else if (event.type === "customer.subscription.updated") {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeSubscriptionId = subscription.id;

        await db.subscription.update({
            where: { stripeSubscriptionId: stripeSubscriptionId },
            data: { status: subscription.status },
        });
    } else if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeSubscriptionId = subscription.id;

        await db.subscription.update({
            where: { stripeSubscriptionId: stripeSubscriptionId },
            data: { status: "canceled" },
        });
    } else {
        return new NextResponse(`Webhook Error: Unsupported event type ${event.type}`, { status: 200 });
    }

    return new NextResponse(null, { status: 200 });
}
