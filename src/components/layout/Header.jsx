import { NavLink, Link } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "홈", end: true },
  { to: "/books", label: "내 책 목록", end: true },
  { to: "/books/new", label: "책 등록", end: true },
  { to: "/about", label: "소개", end: true },
];

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          📚 북로그
        </Link>
        <nav className="header__nav" aria-label="주요 메뉴">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
