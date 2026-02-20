import { useEffect } from "react";
import AuthorUser from "../../components/authors/author";
import { useAuthors } from "../../hooks/useAuthors";

import "./style.module.scss";
import { authorApi } from "../../api/library";

const Authors = () => {
  const { authors, setAuthors, setLoading } = useAuthors();

  useEffect(() => {
    authorApi()
      .getAuthors()
      .then((data) => setAuthors(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [setAuthors, setLoading]);
  return (
    <main>
      {authors.map((author) => (
        <AuthorUser key={author.id} author={author} />
      ))}
    </main>
  );
};

export default Authors;
