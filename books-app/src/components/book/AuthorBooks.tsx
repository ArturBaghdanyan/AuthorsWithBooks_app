import { useNavigate, useParams } from "react-router-dom";
import { useAuthors } from "../../hooks/useAuthors";

import style from "./style.module.scss";

const AuthorBooks = () => {
  const { authors, loading } = useAuthors();
  const { id } = useParams();
  const navigate = useNavigate();

  const author = authors.find((a) => a.id === Number(id));

  if (loading && authors.length === 0) {
    return <div className="loader">Loading author data...</div>;
  }

  if (!author) {
    return (
      <div className="error-container">
        <p>Author not found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <section>
      <h2>Books by {author.name}</h2>
      <hr />

      {author.books && author.books.length > 0 ? (
        <>
          {author.books.map((book) => (
            <div key={book.id} className={style.bookItem}>
              <h2 className={style.bookItem_author}>{book.bookName}</h2>
              <p>
                <strong>Release Year:</strong> {book.year}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
              <p>
                <strong>Pages:</strong> {book.countPages}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p>This author has no books listed yet.</p>
      )}
    </section>
  );
};

export default AuthorBooks;
