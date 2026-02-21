import { Book } from "../models/index.js";

export const getBooksByAuthor = async (req, res) => {
  const { authorId } = req.params;
  try {
    const books = await Book.findAll({
      where: { author_id: authorId },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { bookName, year, description, countPages, authorId } = req.body;
    const newBook = await Book.create({
      bookName,
      year: Number(year),
      description,
      countPages,
      author_id: authorId,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const remove = await author.findByPk(id);
    await remove.destroy();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
