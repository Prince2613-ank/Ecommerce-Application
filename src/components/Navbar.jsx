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
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;
  const handleLogout = () => {
  dispatch(logout());
  navigate("/login");
  setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/products" className="nav-logo">Welcome To Store</Link>
      <div className="nav-links desktop-only">
        <Link to="/products">🛍 Products</Link>
        <Link to="/wishlist">❤️ Wishlist ({wishlistCount})</Link>
        <Link to="/cart">🛒 Cart ({cartCount})</Link>
        <Link to="/orders">📦 Orders</Link>

        <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
      <button className="hamburger-btn mobile-only" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="menu-card">
            <Link to="/products" onClick={() => setMenuOpen(false)}>🛍 Products</Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>❤️ Wishlist ({wishlistCount})</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>🛒 Cart ({cartCount})</Link>
            <Link to="/orders" onClick={() => setMenuOpen(false)}>📦 Orders</Link>

            <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button>

            <button onClick={handleLogout}>🚪 Logout</button>
          </div>
        </>
      )}
    </nav>
  );
}
