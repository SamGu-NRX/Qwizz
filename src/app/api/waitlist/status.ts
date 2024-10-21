// pages/api/waitlist/status.ts

import { NextApiRequest, NextApiResponse } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/../auth";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth(req, res);

  if (!session) {
    return res.status(200).json({ hasSignedUp: false });
  }

  const waitlistEntry = await db.waitlistEntry.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  res.status(200).json({ hasSignedUp: !!waitlistEntry });
}
