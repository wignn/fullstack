import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { bookId, genreId } = await request.json();

  if (!bookId || !genreId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await prisma.book.update({
      where: { id: bookId },
      data: {
        genre: {
          connect: { id: genreId },
        },
      },
    });
    return NextResponse.json({ message: "Genre added to book successfully." });
  } catch (error) {
    console.error("Error updating book genre:", error);
    return NextResponse.json({ error: "Failed to update book genre" }, { status: 500 });
  }
}