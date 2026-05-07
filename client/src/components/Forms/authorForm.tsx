import { useState } from "react";
import style from "./style.module.scss";
import type { Author } from "../../types/booksType";

export const AuthorForm = ({
  handleSubmit,
}: {
  handleSubmit: (author: Omit<Author, "id">) => void;
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || age <= 0)
      return alert("Please enter valid author details");

    handleSubmit({
      name,
      age,
      books: [],
    });
  };

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <h2>Add New Author</h2>
      <input
        placeholder="Author Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Author Age"
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />

      <button
        type="submit"
        id="hidden-author-submit"
        style={{ display: "none" }}
      />
    </form>
  );
};
