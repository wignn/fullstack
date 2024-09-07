const prisma = require("../config/db");

//get all book
exports.getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        chapters: true,
      },
    });
    res.json(books);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

exports.getBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        chapters: true,
        genre: true,
      },
    });
    res.json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

exports.getChapter = async (req, res) => {
  const { bookId } = req.params;
  try {
    const chapters = await prisma.chapter.findMany({
      where: { bookId: bookId },
    });
    res.json(chapters);
  } catch (err) {
    console.error("Error fetching chapters:", err);
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
};
