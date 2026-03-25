import { NavLink } from "react-router-dom";

export default function TopNavbar({ theme, onToggleTheme }) {
  return (
    <header className="top-navbar">
      <div className="brand-block">
        <p className="brand-mark">Youth Skill Gap Analyzer</p>
        <p className="brand-subtitle">Career Roadmap Platform</p>
      </div>
      <nav className="top-navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
        >
          Login
        </NavLink>
        <button className="btn btn-secondary theme-toggle-btn" type="button" onClick={onToggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </header>
  );
}
