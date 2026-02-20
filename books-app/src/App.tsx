import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import { AuthorsProvider } from "./context/AuthorsContext";

import HomePage from "./pages/homePage/HomePage";
import BookList from "./pages/book-list/BookList";
import Authors from "./pages/authors/Authors";
import AuthorBooks from "./components/book/AuthorBooks";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "authors", element: <Authors /> },
      { path: "books", element: <BookList /> },
      { path: "/books/:id", element: <AuthorBooks /> },
    ],
  },
]);

function App() {
  return (
    <AuthorsProvider>
      <RouterProvider router={router} />
    </AuthorsProvider>
  );
}

export default App;
