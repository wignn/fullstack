import { book } from './../../../lib/data';
'use server'
import { Genre } from "@/app/components/Book/buttons";
import { genre } from "@/app/DataBook/genre/data";
import { prisma } from "@/lib/prisma";

export const bookMark = async (id: any) => {
  console.log(`Received userId bookmark: ${id}`);
  try {
    const dataUser = await prisma.book.findUnique({
      where: { id: id },
    });

    return dataUser;
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};


export const chapter = async (bookId:any) => {

  try {
    const chapters = await prisma.chapter.findMany({
      where: { bookId: bookId },
      include:{
        
      }
    });

    // console.log(`Fetched chapters: ${JSON.stringify(chapters, null, 2)}`);
    return chapters;
  } catch (err) {
    console.error('Error fetching chapters:', err);
    return [];
  }
};
export const Bookdata = async (bookId:any) => {

  try {
   const  book = await prisma.book.findUnique({
      where: { id: bookId },
      include:{
        chapters:true,
        genre:true
      }
  
    });

    console.log(`Fetched chapters: ${JSON.stringify(book.genre)}`);
    return book;
  } catch (err) {
    console.error('Error fetching chapters:', err);
    return [];
  }
};

export const deleteChapter = async (id: string) => {
  try {
    console.log('Deleting bookmark with ID:', id);
    await prisma.chapter.delete({
      where: { id },
    });
    console.log('Book deleted successfully');
  } catch (error) {
    console.error("Failed to delete book:", error);
    return { message: "Failed to delete book" };
  }
};





