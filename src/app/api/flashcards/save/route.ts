import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions, req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, isSaved } = await req.json();

  try {
    const flashcard = await prisma.flashcard.update({
      where: { id },
      data: { isSaved },
    });

    return NextResponse.json({ success: true, flashcard });
  } catch (error) {
    console.error('Error saving flashcard:', error);
    return NextResponse.json({ error: 'Error saving flashcard' }, { status: 500 });
  }
}
