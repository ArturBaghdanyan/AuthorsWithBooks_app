import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import { AuthorsProvider } from "./context/AuthorsContext";

import HomePage from "./pages/homePage/HomePage";
import BookList from "./pages/book-list/BookList";
import Authors from "./pages/authors/Authors";
import AuthorBooks from "./components/book/AuthorBooks";

import "./App.css";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      { index: true, element: <HomePage /> },
      { path: "/authors", element: <Authors /> },
      { path: "/books", element: <BookList /> },
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
