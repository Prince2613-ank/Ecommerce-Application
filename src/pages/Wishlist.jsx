import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="container">
        <h2>❤️ My Wishlist</h2>

        <div className="empty-cart">
          <div className="empty-cart-icon">🤍</div>
          <p><strong>Your wishlist is empty</strong></p>
          <p>Add items you love to see them here.</p>
          <button
            className="empty-cart-btn"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>❤️ My Wishlist</h2>

      <div className="products-grid">
        {wishlistItems.map((product) => (
          <div key={product.id} className="card">
            {/* IMAGE */}
            <div
              className="image-wrapper"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
              />
            </div>

            {/* CATEGORY */}
            <span className="product-category">{product.category}</span>

            {/* NAME */}
            <h4>{product.name}</h4>

            {/* PRICE */}
            <p className="product-price">₹{product.price}</p>

            {/* ACTIONS */}
            <div className="card-actions">
              <button
                onClick={() => navigate(`/products/${product.id}`)}
              >
                View
              </button>

              <button
                className="wishlist-btn active"
                onClick={() => dispatch(toggleWishlist(product))}
              >
                Remove ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
