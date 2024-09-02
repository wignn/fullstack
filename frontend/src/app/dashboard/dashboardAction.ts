import { prisma } from "@/lib/prisma";

export const GetDashboard = async (query: string) => {
  try {
    const books = await prisma.book.findMany({
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

    // console.log('Fetched books:', books);
    return books;
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];
  }
};
