const prisma  = require("../config/db");

const getBook = async (req, res) => {
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

const getChapter = async (req, res)=>{
    const { bookId } = req.params;
    try {
      const chapters = await prisma.chapter.findMany({
        where: { bookId: bookId },
      });
      res.json(chapters);
    } catch (err) {
      console.error('Error fetching chapters:', err);
      res.status(500).json({ error: 'Failed to fetch chapters' });
    }
}

module.exports = {
    getBook,
    getChapter,

}