//@ts-nocheck
'use server'
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function btnDataBookMark(userId: string, bookId: string) {
  try {
    const data = await prisma.bookMark.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });
    return !!data && data; 
  } catch (error) {
    console.error("Error checking bookmark:", error);
    return false; 
  }
}

export async function DataBookMark(userId: string) {
  try {
    const data = await prisma.bookMark.findMany({
      where: {
        userId: userId,
      },
      include: {
        book:true
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }
}

export const deleteMark = async (id: string) => {
  try {
    console.log('Deleting book with ID:', id);
    await prisma.bookMark.delete({
      where: { id },
    });
    console.log('Book deleted successfully');
  } catch (error) {
    console.error("Failed to delete book:", error);
    return { message: "Failed to delete book" };
  }
};


