import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <header>
      <div className="header">
        <h1>Book List</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/books">Books</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
