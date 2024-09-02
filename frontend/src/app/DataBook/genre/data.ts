
"use server";
import { prisma } from "@/lib/prisma";

export const genre = async () => {
  try {
    const genres = await prisma.genre.findMany({
      include: {
        books: true, 
      },
    });

    if (!genres) {
      throw new Error("Chapter not found");
    }

    return genres
  } catch (err) {
    console.error("Error fetching chapter content:", err);
    return null;
  }
};


export const book = async (bookId) => {
  try {
    const books = await prisma.book.findMany({
        where:{id: bookId},
      include: {
        genre: true, 
      },
    });

    if (!books) {
      throw new Error("Chapter not found");
    }

    return books;
  } catch (err) {
    console.error("Error fetching chapter content:", err);
    return null;
  }
};

export const bookDar = async (bookId) => {
    try {
      const books = await prisma.book.findMany({
        where: {
          id: bookId, // Assuming you're filtering by bookId
        },
        include: {
          genre: true, // This will include related genres
        },
      });
  
      if (!books.length) {
        throw new Error("Book not found");
      }
  
      return books;
    } catch (err) {
      console.error("Error fetching book content:", err);
      return null;
    }
  };
  