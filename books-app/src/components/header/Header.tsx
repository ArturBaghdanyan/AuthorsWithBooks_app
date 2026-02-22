import { NavLink } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <header>
      <div className="header">
        <h1>Book List</h1>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/authors">Authors</NavLink>
          <NavLink to="/books">Books</NavLink>
        </nav>

        <div className="header-auth">
          <NavLink to="/login" className="nav-link">
            Sign In
          </NavLink>
          <NavLink to="/register" className="nav-link">
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
