import { useEffect, useState } from "react";
import { useAuthors } from "../../hooks/useAuthors";
import { authorApi } from "../../api/library";
import BookItem from "../../components/book/bookItem";

import Modal from "../../components/modal/Modal";
import { AuthorForm } from "../../components/Forms/authorForm";

import style from "./home.module.scss";
import { BookForm } from "../../components/Forms/bookForm";
import type { Book } from "../../types/booksType";

const HomePage = () => {
  const {
    authors,
    setAuthors,
    loading,
    setLoading,
    createAuthor,
    removeAuthor,
    createBook,
    updateAuthorBooks,
    removeAuthorBooks,
  } = useAuthors();

  const [activeAuthorId, setActiveAuthorId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deletingAuthorId, setDeletingAuthorId] = useState<number | null>(null);
  useEffect(() => {
    authorApi()
      .getAuthors()
      .then((data) => setAuthors(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [setAuthors, setLoading]);

  const handleAddBook = async (bookFields: Omit<Book, "id" | "authorId">) => {
    if (activeAuthorId === null) return;

    try {
      await createBook(activeAuthorId, bookFields);

      setActiveAuthorId(null);
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  };

  if (loading) return <div className={style.loading}>Loading...</div>;

  return (
    <div className={style.homePage}>
      <div className={style.homePage_button}>
        <button onClick={() => setShowModal(true)}>Add New Author</button>
      </div>

      {showModal && (
        <Modal
          onConfirm={() =>
            document.getElementById("hidden-author-submit")?.click()
          }
          onClose={() => setShowModal(false)}
          text1="Add Author"
          text2="Cancel"
        >
          <AuthorForm
            handleSubmit={(newAuthorData) => {
              createAuthor(newAuthorData).then(() => setShowModal(false));
            }}
          />
        </Modal>
      )}

      {activeAuthorId !== null && (
        <Modal
          onConfirm={() =>
            document.getElementById("hidden-submit-btn")?.click()
          }
          onClose={() => setActiveAuthorId(null)}
          text1="Create Book"
          text2="Cancel"
        >
          <BookForm onSubmit={handleAddBook} />
        </Modal>
      )}

      <div className={style.authorsContainer}>
        <h2>All Books</h2>

        {authors.map((author) => (
          <div key={author.id} className={style.author}>
            <div className={style.author_title}>
              <h2>{author.name}</h2>

              <div className={style.author_title_buttons}>
                <button onClick={() => setActiveAuthorId(author.id)}>
                  Create Book
                </button>

                <button onClick={() => setDeletingAuthorId(author.id)}>
                  Delete Author
                </button>
              </div>

              {deletingAuthorId !== null && (
                <Modal
                  onClose={() => setDeletingAuthorId(null)}
                  onConfirm={async () => {
                    await removeAuthor(deletingAuthorId);
                    setDeletingAuthorId(null);
                  }}
                  text1="Delete"
                  text2="Cancel"
                >
                  <div style={{ padding: "20px" }}>
                    <p>
                      Are you sure you want to remove this author and all their
                      books?
                    </p>
                  </div>
                </Modal>
              )}
            </div>

            {author.books?.length > 0 ? (
              author.books.map((b) => (
                <BookItem
                  key={b.id}
                  book={b}
                  onDelete={(bookId) => removeAuthorBooks(author.id, bookId)}
                  onUpdate={(bookId, updatedFields) => {
                    const newBooksList = author.books.map((b) =>
                      b.id === bookId ? { ...b, ...updatedFields } : b,
                    );

                    updateAuthorBooks(author.id, newBooksList);
                  }}
                />
              ))
            ) : (
              <p className={style.noBooks}>No books listed for this author.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
