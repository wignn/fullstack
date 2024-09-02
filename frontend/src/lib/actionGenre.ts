'use server'
import { prisma } from "@/lib/prisma";

export default async function addGenre(prev: any, formData: FormData) {
  const bookId = formData.get("bookId") as string;

  if (!bookId) {
    throw new Error("Missing required field: bookId");
  }

 
  const genreIds = formData.getAll("genreId").map(id => parseInt(id as string, 10));

  if (genreIds.length === 0) {
    throw new Error("No genre IDs provided.");
  }

  try {
    const result = await prisma.book.update({
      where: { id: bookId },
      include: { genre: true },
      data: {
        genre: {
          connect: genreIds.map(id => ({ id }))
        }
      }
    });
    
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error updating book genre:", error);
  }
}
