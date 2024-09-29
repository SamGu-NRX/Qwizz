import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions, req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { flashcards, title, subject, flashcardSetId } = await req.json();

  try {
    let flashcardSet;
    if (flashcardSetId) {
      // Update existing flashcard set
      flashcardSet = await prisma.flashcardSet.update({
        where: { id: flashcardSetId },
        data: {
          flashcards: {
            create: flashcards.map((card: any) => ({
              title: card.title || '',
              front: card.front,
              back: card.back,
              source: card.source || '',
              date: {
                create: {
                  day: new Date().getDate(),
                  month: new Date().getMonth() + 1,
                  year: new Date().getFullYear(),
                  time: new Date().toISOString(),
                },
              },
            })),
          },
        },
        include: {
          flashcards: true,
        },
      });
    } else {
      // Create new flashcard set
      flashcardSet = await prisma.flashcardSet.create({
        data: {
          title: title || 'Untitled Flashcard Set',
          subject: subject || '',
          userId: session.user.id,
          flashcards: {
            create: flashcards.map((card: any) => ({
              title: card.title || '',
              front: card.front,
              back: card.back,
              source: card.source || '',
              date: {
                create: {
                  day: new Date().getDate(),
                  month: new Date().getMonth() + 1,
                  year: new Date().getFullYear(),
                  time: new Date().toISOString(),
                },
              },
            })),
          },
        },
        include: {
          flashcards: true,
        },
      });
    }

    return NextResponse.json({ success: true, flashcardSet });
  } catch (error) {
    console.error('Error saving flashcards:', error);
    return NextResponse.json({ error: 'Error saving flashcards' }, { status: 500 });
  }
}
