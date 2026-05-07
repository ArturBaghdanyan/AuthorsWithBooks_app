import axios from "axios";
import type { Author, Book } from "../types/booksType";

const API = import.meta.env.VITE_BOOKS_URL || "http://localhost:5000";

export const authorApi = () => {
  const getAuthors = async (): Promise<Author[]> => {
    try {
      const response = await axios.get(`${API}/authors`);

      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch authors: " + err);
    }
  };

  const getAuthorById = async (id: number): Promise<Author> => {
    try {
      const response = await axios.get(`${API}/authors/${id}`);
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch author: " + err);
    }
  };

  const createAuthor = async (author: Omit<Author, "id">): Promise<Author> => {
    try {
      const response = await axios.post(`${API}/authors`, author);
      return response.data;
    } catch (err) {
      throw new Error("Failed to create author: " + err);
    }
  };

  const updateAuthor = async (
    id: number,
    authorData: Omit<Author, "id">,
  ): Promise<Author> => {
    try {
      const response = await axios.put(`${API}/authors/${id}`, authorData);
      return response.data;
    } catch (err) {
      throw new Error("Failed to update author: " + err);
    }
  };

  const deleteAuthor = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API}/authors/${id}`);
    } catch (err) {
      throw new Error("Failed to delete author: " + err);
    }
  };

  const postNewBook = async (book: Omit<Book, "id">) => {
    try {
      const response = await axios.post(`${API}/books`, book);
      return response.data;
    } catch (err) {
      throw new Error("Failed to create book: " + err);
    }
  };
  const deleteBook = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API}/books/${id}`);
    } catch (err) {
      throw new Error("Failed to delete book: " + err);
    }
  };
  return {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    postNewBook,
    deleteBook,
  };
};

export const bookApi = () => {
  return {};
};
