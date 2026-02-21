import { createContext, useCallback, useState } from "react";
import type { Author, Book } from "../types/booksType";
import { authorApi } from "../api/library";

interface AuthorContextType {
  authors: Author[];
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentAuthor: Author | null;
  setCurrentAuthor: React.Dispatch<React.SetStateAction<Author | null>>;
  fetchAuthorById: (id: number) => Promise<void>;
  createAuthor: (author: Omit<Author, "id">) => Promise<void>;
  removeAuthor: (authorId: number) => Promise<void>;
  createBook: (
    authorId: number,
    bookData: Omit<Book, "id" | "authorId">,
  ) => Promise<void>;
  updateAuthorBooks: (authorId: number, data: Book[]) => Promise<void>;
  removeAuthorBooks: (authorId: number, bookId: number) => Promise<void>;
}

const AuthorContext = createContext<AuthorContextType | undefined>(undefined);
export const AuthorsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);

  const createAuthor = async (author: Omit<Author, "id">) => {
    try {
      const newAuthor = await authorApi().createAuthor(author);
      setAuthors((prev) => [...prev, newAuthor]);
      console.log(`new Author: ${newAuthor}`);
    } catch (err) {
      console.error("Failed to create author:", err);
      throw err;
    }
  };

  const removeAuthor = async (authorId: number) => {
    try {
      await authorApi().deleteAuthor(authorId);

      setAuthors((prev) => prev.filter((author) => author.id !== authorId));
      if (currentAuthor?.id === authorId) {
        setCurrentAuthor(null);
      }

      console.log(`Author with ID ${authorId} deleted successfully`);
    } catch (err) {
      console.log(err);
    }
  };

  const createBook = async (
    authorId: number,
    bookData: Omit<Book, "id" | "authorId">,
  ) => {
    try {
      const savedBook = await authorApi().postNewBook({
        ...bookData,
        authorId,
      });

      setAuthors((prev) =>
        prev.map((author) =>
          author.id === authorId
            ? { ...author, books: [...(author.books || []), savedBook] }
            : author,
        ),
      );
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  const updateAuthorBooks = async (authorId: number, books: Book[]) => {
    const authorToUpdate = authors.find((a) => a.id === authorId);
    if (!authorToUpdate) throw new Error("Author not found");

    const updatedAuthorData: Omit<Author, "id"> = {
      name: authorToUpdate.name,
      age: authorToUpdate.age,
      books,
    };

    try {
      const updatedAuthorFromServer = await authorApi().updateAuthor(
        authorId,
        updatedAuthorData,
      );

      setAuthors((prev) =>
        prev.map((a) => (a.id === authorId ? updatedAuthorFromServer : a)),
      );
    } catch (err) {
      console.error("Failed to update books:", err);
      throw err;
    }
  };

  const fetchAuthorById = useCallback(async (id: number | string) => {
    setLoading(true);
    try {
      const data = await authorApi().getAuthorById(id as number);
      setCurrentAuthor(data);
    } catch (err) {
      console.error("Failed to fetch author:", err);
      setCurrentAuthor(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAuthorBooks = async (authorId: number, bookId: number) => {
    console.log("id:", authorId);

    const originalAuthors = [...authors];

    setAuthors((prev) =>
      prev.map((author) =>
        author.id === authorId
          ? { ...author, books: author.books?.filter((b) => b.id !== bookId) }
          : author,
      ),
    );

    try {
      const targetAuthor = authors.find((a) => a.id === authorId);
      console.log(`Book with ID ${bookId} removed from author ${authorId}`);
      if (targetAuthor && targetAuthor.books) {
        const updatedBooks = targetAuthor.books.filter((b) => b.id !== bookId);
        await updateAuthorBooks(authorId, updatedBooks);
      }
    } catch (err) {
      setAuthors(originalAuthors);
      console.error("Failed to delete book:", err);
    }
  };

  return (
    <AuthorContext.Provider
      value={{
        authors,
        setAuthors,
        currentAuthor,
        removeAuthor,
        setCurrentAuthor,
        loading,
        setLoading,
        fetchAuthorById,
        createAuthor,
        createBook,
        updateAuthorBooks,
        removeAuthorBooks,
      }}
    >
      {children}
    </AuthorContext.Provider>
  );
};

export default AuthorContext;
