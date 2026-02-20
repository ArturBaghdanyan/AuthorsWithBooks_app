import React, { useState } from "react";
import Modal from "../modal/Modal";
import { BookForm } from "../Forms/bookForm";

import type { Book } from "../../types/booksType";
import { MdDelete, MdEdit } from "react-icons/md";

import style from "./style.module.scss";

interface BookItemProps {
  book: Book;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedFields: Book) => void;
}
const BookItem: React.FC<BookItemProps> = ({ book, onUpdate, onDelete }) => {
  const { bookName, year, description, countPages } = book;

  const [isEditing, setIsEditing] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const handleDelete = () => {
    onDelete(book.id);

    console.log("Book deleted with ID:", book.id);

    setIsRemove(false);
  };

  return (
    <div className={style.bookItem}>
      <h2 className={style.author}>{bookName}</h2>
      <p>
        <strong>Release Year:</strong> {year}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Pages:</strong> {countPages}
      </p>

      <div className={style.buttons}>
        <button onClick={() => setIsEditing(true)}>
          <MdEdit />
        </button>

        {isEditing && (
          <Modal
            onConfirm={() => {
              document.getElementById("hidden-submit-btn")?.click();
            }}
            onClose={() => setIsEditing(false)}
            text1="Save"
            text2="Cancel"
          >
            <h2>Edit Book</h2>

            <BookForm
              initialData={book}
              onSubmit={(updatedFields) => {
                onUpdate(book.id, { ...book, ...updatedFields });
                setIsEditing(false);
              }}
            />
          </Modal>
        )}

        <button onClick={() => setIsRemove(true)}>
          <MdDelete />
        </button>

        {isRemove && (
          <Modal
            onConfirm={() => handleDelete()}
            onClose={() => setIsRemove(false)}
            text1="Confirm"
            text2="Cancel"
          >
            <h2>Are you sure you want to delete this book?</h2>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BookItem;

// import React, { useState } from "react";
// import Modal from "../modal/Modal";
// import { BookForm } from "../Forms/bookForm";
// import type { Book } from "../../types/booksType";
// import { MdDelete, MdEdit } from "react-icons/md";
// import style from "./style.module.scss";

// interface BookItemProps {
//   book: Book;
//   onDelete: (id: number) => void;
//   onUpdate: (id: number, updatedFields: Book) => void;
// }

// const BookItem: React.FC<BookItemProps> = ({ book, onDelete, onUpdate }) => {

//   const { bookName, year, description, countPages } = book;

//   const [isEditing, setIsEditing] = useState(false);

//   const [isRemove, setIsRemove] = useState(false);

//   const [formData, setFormData] = useState<Book>({

//     id: book.id,

//     bookName: book.bookName,

//     year: book.year,

//     description: book.description,

//     countPages: book.countPages,

//     authorId: book.authorId,

//   });

//   const handleUpdate = (e?: React.FormEvent) => {

//     if (e) e.preventDefault();

//     onUpdate(book.id, formData);

//     setIsEditing(false);

//   };

//   const handleDelete = () => {

//     onDelete(book.id);

//     console.log("Book deleted with ID:", book.id);

//     setIsRemove(false);

//   };

//   return (

//     <div className={style.bookItem}>

//       <h2 className={style.author}>{bookName}</h2>

//       <p>

//         <strong>Release Year:</strong> {year}

//       </p>

//       <p>

//         <strong>Description:</strong> {description}

//       </p>

//       <p>

//         <strong>Pages:</strong> {countPages}

//       </p>

//       <div className={style.buttons}>

//         <button onClick={() => setIsEditing(!isEditing)}>

//           <MdEdit />

//         </button>

//         {isEditing && (

//           <Modal

//             onConfirm={() => handleUpdate()}

//             onClose={() => setIsEditing(false)}

//             text1="Save"

//             text2="Cancel"

//           >

//             <h2>Edit Book</h2>

//             <BookForm

//               formData={formData}

//               setFormData={setFormData}

//               handleUpdate={handleUpdate}

//             />

//           </Modal>

//         )}

//         <button onClick={() => setIsRemove(true)}>

//           <MdDelete />

//         </button>

//         {isRemove && (

//           <Modal

//             onConfirm={() => handleDelete()}

//             onClose={() => setIsRemove(false)}

//             text1="Confirm"

//             text2="Cancel"

//           >

//             <h2>Are you sure you want to delete this book?</h2>

//           </Modal>

//         )}

//       </div>

//     </div>

//   );

// };

// export default BookItem;
