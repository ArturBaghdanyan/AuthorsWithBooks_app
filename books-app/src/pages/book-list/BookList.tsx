import { useEffect } from "react";
import { authorApi } from "../../api/library";
import BookItem from "../../components/book/bookItem";
import { useAuthors } from "../../hooks/useAuthors";

import style from "./style.module.scss";

const BookList = () => {
  const {
    authors,
    setAuthors,
    setLoading,
    updateAuthorBooks,
    removeAuthorBooks,
  } = useAuthors();
  const allBooks = authors.flatMap((author) => author.books || []);

  useEffect(() => {
    authorApi()
      .getAuthors()
      .then((data) => setAuthors(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [setAuthors, setLoading]);

  return (
    <div className={style.bookList}>
      <h1>Library Collection</h1>
      <div className={style.bookList_container}>
        {allBooks.length > 0 ? (
          allBooks.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onDelete={() => removeAuthorBooks(book.id, book.id)}
              onUpdate={(bookId, updatedFields) => {
                const author = authors.find((a) => a.id === book.id);
                if (!author) return;

                const newBooksList = author.books.map((b) =>
                  b.id === bookId ? { ...b, ...updatedFields } : b,
                );

                updateAuthorBooks(author.id, newBooksList);
              }}
            />
          ))
        ) : (
          <p>No books available in the library.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
