// pages/api/activate.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  if (typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid token' });
  }

  const { password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { activationToken: token },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Activate the user account
    await prisma.user.update({
      where: { id: user.id },
      data: {
        activationToken: null,
        emailVerified: new Date(),
        hashedPassword,
      },
    });

    res.status(200).json({ message: 'Account activated' });
  } catch (error) {
    console.error('Activation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
