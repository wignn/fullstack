const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      {
        title: 'Sample Book 1',
        author: 'Author 1',
        url: 'https://example.com/book1',
      },
      {
        title: 'Sample Book 2',
        author: 'Author 2',
        url: 'https://example.com/book2',
      },
      {
        title: 'Sample Book 3',
        author: 'Author 3',
        url: 'https://example.com/book3',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
