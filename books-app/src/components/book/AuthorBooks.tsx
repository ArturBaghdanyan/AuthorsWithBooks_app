import { useNavigate, useParams } from "react-router-dom";
import { useAuthors } from "../../hooks/useAuthors";

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
    <div className="author-books-container">
      <h2>Books by {author.name}</h2>
      <p>Age: {author.age}</p>

      <hr />

      {author.books && author.books.length > 0 ? (
        <div className="books-grid">
          {author.books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.bookName}</h3>
              <p>
                <strong>Year:</strong> {book.year}
              </p>
              <p>{book.description}</p>
              <span>{book.countPages} pages</span>
            </div>
          ))}
        </div>
      ) : (
        <p>This author has no books listed yet.</p>
      )}
    </div>
  );
};

export default AuthorBooks;
