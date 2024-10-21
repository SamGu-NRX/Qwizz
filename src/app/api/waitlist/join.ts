// pages/api/waitlist/join.ts

import { NextApiRequest, NextApiResponse } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/../auth";
import { db } from "@/lib/db";
import { Resend } from "resend";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY); // Replace with your Resend API key

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 if (req.method === "POST") {
   const { email, phone } = req.body;

   if (!email) {
     return res.status(400).json({ error: "Email is required" });
   }

   try {
     // Check if user already exists
     let user = await db.user.findUnique({
       where: { email },
     });

     if (!user) {
       // Create a temporary password (hashed)
       const tempPassword = randomBytes(8).toString("hex");
       const hashedPassword = await hash(tempPassword, 10);

       // Create new user
       user = await db.user.create({
         data: {
           email,
           phoneNumber: phone || null,
           hashedPassword,
           // Other default fields can be set here
         },
       });

       // Note: Account creation can be handled when the user links their OAuth accounts.
     }

     // Create or update WaitlistEntry
     await db.waitlistEntry.upsert({
       where: { email },
       update: {
         phone: phone || null,
       },
       create: {
         email,
         phone: phone || null,
         userId: user.id,
       },
     });

     // Send email via Resend
     await resend.emails.send({
       from: "Sam from Qwizz <sgu07966@gmail.com",
       to: email,
       subject: "Thank you for joining our waitlist",
       html: "<p>Thank you for joining our waitlist!</p>", // TODO: edit the shit out this guys
     });

     res.status(200).json({ message: "Success" });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal server error" });
   }
 } else {
   res.setHeader("Allow", ["POST"]);
   res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
