import { book } from './../../../lib/data';
"use server";
import { prisma } from "@/lib/prisma";

export const Content = async (chapterTitle: string) => {
  console.log(`Fetching content for chapter: ${chapterTitle}`);
  try {
    const chapter = await prisma.chapter.findFirst({
      where: { title: chapterTitle },
      include: {
        book: true, 
      },
    });


    return chapter;
  } catch (err) {
    console.error("Error fetching chapter content:", err);
    return null;
  }
};

export const testts = async (bookIf) => {
  console.log(`Fetching aaaaaa content for Book titkenya: ${bookIf} `);
  try {
    const chapter = await prisma.book.findFirst({
      where: { title: bookIf },
      include: {
        chapters: true,
      },
    });

    if (!chapter) {
      throw new Error("Chapter not found");
    }

    return chapter;
  } catch (err) {
    console.error("Error fetching chapter content:", err);
    return null;
  }
};