import React from "react";
import type { Author } from "../../types/booksType";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

interface AuthorUserProps {
  author: Author;
}
const AuthorUser: React.FC<AuthorUserProps> = ({ author }) => {
  return (
    <section>
      <div className={style.authorCard}>
        <p className={style.authorCard_name}>
          Author user: <strong>{author.name}</strong>
        </p>
        <p>{author.age} years old</p>
        <Link to={`/books/${author.id}`}>View Books</Link>
      </div>
    </section>
  );
};

export default AuthorUser;
