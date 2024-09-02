'use server'
import { book } from "@/lib/data";
import { prisma } from "@/lib/prisma";

const addBookmark = async (bookId: string, userId:number) => {
  console.log(`Adding bookmark for book ID ${bookId} user ID ${userId}`);
  
  if (!bookId || !userId){
    console.log(`id kosong ${bookId} ${userId}`)
  }
  else{
    console.log(`id ada ${bookId} ${userId}`)
  }

  try {
    const result = await prisma.bookMark.create({
      data: {
        bookId: bookId,
        userId:userId,
      },
      include: {
        book: true,
      }

    });
    console.log(`Bookmark for book with ID ${bookId} added for user with ID ${userId}`);
    return result
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

export default addBookmark;
