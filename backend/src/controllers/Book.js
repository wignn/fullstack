const prisma = require("../config/db");

//create book

const createBook = async (req, res) => {
    const { title, author, coverImage, synopsis } = req.body;
    const publishedAt = new Date();
  
    if (!title || !author || !synopsis) {
      return res
        .status(400)
        .json({ message: "Title, author, and synopsis are required." });
    }
  
    try {
      const book = await prisma.book.create({
        data: {
          title: title,
          author: author,
          coverImage: coverImage,
          synopsis: synopsis,
          publishedAt: publishedAt,
        },
      });
  
      res.status(201).json(book);
    } catch (error) {
      console.error("Error creating book:", error);

      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  };
  
//get all book
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getBookByName = async (req, res)=>{
  try{
    const books = await prisma.book.findFirst({
      where: {title: req.params.title}
    })
  }catch(err){
    console.error("Error fetching book:", err);
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookByName
};
