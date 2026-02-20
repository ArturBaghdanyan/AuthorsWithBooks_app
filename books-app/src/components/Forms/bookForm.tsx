import { useState } from "react";
import type { Book } from "../../types/booksType";
import style from "./style.module.scss";

interface BookFormProps {
  initialData?: Partial<Book>;
  onSubmit: (data: Omit<Book, "id" | "authorId">) => void;
}

export const BookForm = ({ onSubmit, initialData }: BookFormProps) => {
  const [localData, setLocalData] = useState({
    bookName: initialData?.bookName || "",
    year: initialData?.year || 2024,
    description: initialData?.description || "",
    countPages: initialData?.countPages || 0,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(localData);
  };

  return (
    <form onSubmit={handleFormSubmit} className={style.bookForm}>
      <div className={style.form}>
        <input
          placeholder="Book Name"
          value={localData.bookName}
          onChange={(e) => setLocalData({ ...localData, bookName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Year"
          value={localData.year}
          onChange={(e) => setLocalData({ ...localData, year: Number(e.target.value) })}
        />
        <textarea
          placeholder="Description"
          value={localData.description}
          onChange={(e) => setLocalData({ ...localData, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pages"
          value={localData.countPages}
          onChange={(e) => setLocalData({ ...localData, countPages: Number(e.target.value) })}
        />
        <button type="submit" id="hidden-submit-btn" style={{ display: "none" }} />
      </div>
    </form>
  );
};