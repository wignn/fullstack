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

exports.bookCreate = async(req, res)=>{
  try{
    const {title, author, synopsis, coverImage, publishedAt} = req.body
    const result = await prisma.book.create({
      data:{
        title,
        author,
        synopsis,
        coverImage,
        publishedAt
      }
    })
    res.json(result)
  }catch(err){
    console.error("Error creating book:", err);
    res.status(500).json({ error: "Failed to create book" });
  }
}
exports.bookUpdate = async(req, res)=>{
  try{
    const {title, author, synopsis, coverImage, publishedAt, bookId} = req.body
    const result = await prisma.book.update({
      where:{id: bookId},
      data:{
        title,
        author,
        synopsis,
        coverImage,
        publishedAt
      }
    })
    res.json(result)
  }catch(err){
    console.error("Error update book:", err);
    res.status(500).json({ error: "Failed to update book" });
  }
}
exports.deleteUpdate = async(req, res)=>{
  try{
    const {bookId} = req.body
    const result = await prisma.book.delete({
      where:{id: bookId},
    })
    res.json(result)
  }catch(err){
    console.error("Error update book:", err);
    res.status(500).json({ error: "Failed to update book" });
  }
}