const prisma = require("../config/db");

const ITEMS_PER_PAGE = 5; 

// Create a new book
const createBook = async (req, res) => {
  const { title, author, coverImage, synopsis } = req.body;
  const publishedAt = new Date();

  if (!title || !author || !synopsis) {
    return res.status(400).json({
      message: "Title, author, and synopsis are required.",
    });
  }

  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        coverImage,
        synopsis,
        publishedAt,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get a book by title
const getBookByName = async (req, res) => {
  const { title } = req.params;
  try {
    const book = await prisma.book.findFirst({
      where: { title: { contains: title } },
    });

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({
      error: "An error occurred while fetching the book",
    });
  }
};

// Get books with pagination and search query
const getBook = async (req, res) => {
  const query = req.query.query || "";

  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { author: { contains: query } },
        ],
      },
    });
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({
      error: "An error occurred while fetching books",
    });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'An error occurred while deleting the book' });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookByName,
  getBook,
  deleteBook
};
