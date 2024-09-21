import { prisma } from "@/lib/prisma";

export const GetDashboard = async (query: string) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            },
          },
          {
            author: {
              contains: query,
                 mode: 'insensitive'
            },
          },
        ],
      },
    });

    // console.log('Fetched books:', books);
    return books;
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];
  }
};
