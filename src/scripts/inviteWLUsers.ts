// scripts/inviteBetaUsers.ts

import { db } from "@/lib/db";
import { randomBytes } from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

async function inviteUsers() {
  // Fetch users from the waitlist
  const waitlistEntries = await db.waitlistEntry.findMany({
    where: {
      // Add your selection criteria here
    },
    include: {
      user: true,
    },
  });

  for (const entry of waitlistEntries) {
    if (!entry.user.betaInvited) {
      const activationToken = randomBytes(32).toString("hex");

      // Update user with beta invite
      await db.user.update({
        where: { id: entry.userId },
        data: {
          betaInvited: true,
          activationToken,
        },
      });

      // Send activation email
      const activationLink = `https://yourdomain.com/activate?token=${activationToken}`;
      await resend.emails.send({
        from: "Your Name <your_email@example.com>",
        to: entry.email,
        subject: "You are invited to our beta program!",
        html: `<p>Click <a href="${activationLink}">here</a> to activate your account.</p>`,
      });
    }
  }
}

inviteUsers()
  .then(() => {
    console.log("Beta invitations sent.");
  })
  .catch((error) => {
    console.error("Error inviting users:", error);
  });
