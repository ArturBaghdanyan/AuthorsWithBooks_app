import { Author, Book } from "../models/index.js";

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      include: [
        {
          model: Book,
          as: "books",
        },
      ],
    });

    res.json(authors);
  } catch (error) {
    console.error("🔥 GET /authors ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findByPk(id, {
      include: Book,
      as: "books",
    });
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createAuthor = async (req, res) => {
  const { name, age, book } = req.body;

  const t = await Author.sequelize.transaction();

  try {
    const newAuthor = await Author.create(
      {
        name,
        age,
      },
      { transaction: t },
    );

    await t.commit();

    const authorWithBooks = {
      ...newAuthor.toJSON(),
      books: [],
    };
    res.status(201).json(authorWithBooks);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, age, books } = req.body;

  const t = await Author.sequelize.transaction();

  try {
    const author = await Author.findByPk(Number(id), { transaction: t });

    if (!author) {
      await t.rollback();
      return res.status(404).json({ error: "Author not found" });
    }

    await author.update({ name, age }, { transaction: t });
    if (books && Array.isArray(books)) {
      const currentDbBooks = await Book.findAll({
        where: { author_id: id },
        transaction: t,
      });
      const currentDbIds = currentDbBooks.map((b) => b.id);

      const incomingIds = books.map((b) => b.id).filter(Boolean);

      const idsToDelete = currentDbIds.filter(
        (oldId) => !incomingIds.includes(oldId),
      );

      if (idsToDelete.length > 0) {
        await Book.destroy({
          where: { id: idsToDelete },
          transaction: t,
        });
      }

      for (let key of books) {
        if (key.id && key.id !== null) {
          await Book.update(
            {
              bookName: key.bookName,
              year: Number(key.year),
              description: key.description,
              countPages: key.countPages,
            },
            {
              where: { id: key.id, author_id: id },
              transaction: t,
            },
          );
        } else {
          await Book.create(
            {
              bookName: key.bookName,
              year: Number(key.year),
              description: key.description,
              countPages: key.countPages,
              author_id: id,
            },
            { transaction: t },
          );
        }
      }
    }

    await t.commit();
    const updatedAuthor = await Author.findByPk(id, {
      include: [
        {
          model: Book,
          as: "books",
        },
      ],
    });
    if (!updatedAuthor) {
      return res
        .status(404)
        .json({ error: "Author saved but could not be re-fetched" });
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteAuthor = await Author.findByPk(id);
    if (!deleteAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }

    await deleteAuthor.destroy();

    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
