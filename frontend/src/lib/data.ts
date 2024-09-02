'use server'

import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 5;

export const GetBook = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const books = await prisma.book.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            author: {
              contains: query,
            },
          },
        ],
      },
    });

    // console.log('Fetched books:', books); // Debugging
    return books;
  } catch (err) {
    console.error('Error fetching books:', err);
    throw err; 
  }
};


export const getBookById = async (id: string) => {
  try {
    const Book = await prisma.book.findUnique({
      where: { id },
    });
    // console.log('Fetched book by ID:', Book); 
    return Book;
  } catch (err) {
    console.error(err);
  }
}


export const user = async () => {
  try {
    const users = await prisma.user.findMany();
    // console.log('Fetched users:', users);
    return users;
  } catch (err) {
    console.error(err);
  }
}

export const book = async ()=>{
  try {
    const books = await prisma.book.findMany({
      include: {
        chapters: true, 
      },
    });
    return books
  }catch(err){
    console.error(err)
  }
}



export const getUserId= async (id: string) => {
  try {
    const usersEdit = await prisma.user.findUnique({
      where: { id },
    });
    // console.log('Fetched book by ID:', Book); 
    return usersEdit;
  } catch (err) {
    console.error(err);
  }
}


export const articels = async () => {
  try {
    const articel = await prisma.article.findMany();
    // console.log('Fetched users:', articel);
    return articel;
  } catch (err) {
    console.error(err);
  }
}



export const GetbookPages = async (query:string) => {
  try {
    const book = await prisma.book.count({
        where: {
          OR: [
            {
              title: {
                contains: query,
                
              },
            },
            {
              author: {
                contains: query,
              },
            },
          ],
        },
      });
      
     const totalPages = Math.ceil(Number(book) / ITEMS_PER_PAGE)
    return totalPages;
  } catch (err) {
    console.error(err);
  }
}

export async function getBooks() {
  return await prisma.book.findMany();
}

export async function getBookBySlug(id) {
  return await prisma.book.findUnique({
    where: { id },
  });
}


export const setUserOnline = async (userId: number) => {
  await prisma.user.update({
    where: { id: userId },
    data: { isOnline: true },
  });
};


export const setUserOffline = async (userId: number) => {
  await prisma.user.update({
    where: { id: userId },
    data: { isOnline: false },
  });
};

