import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

export default function Navbar({ darkMode, setDarkMode }) {
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector((state) => state.cart.items?.length ?? 0);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false); // ✅ REQUIRED

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  if (!user) return null;

  return (
    <nav className="navbar">
  {/* LEFT */}
  <Link to="/products" className="nav-logo">
    Welcome To Store
  </Link>

  {/* RIGHT ICON (HAMBURGER) */}
  <button
    className="hamburger"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Toggle menu"
  >
    ☰
  </button>
   <div className={`nav-links ${menuOpen ? "open" : ""}`}></div>
      {/* RIGHT LINKS */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/products" onClick={() => setMenuOpen(false)}>
          🛍 Products
        </Link>

        <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
          ❤️ Wishlist ({wishlistCount})
        </Link>

        <Link to="/cart" onClick={() => setMenuOpen(false)}>
          🛒 Cart ({cartCount})
        </Link>

        <Link to="/orders" onClick={() => setMenuOpen(false)}>
          📦 Orders
        </Link>

        <button
          className="theme-toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
    </nav>
  );
}
