import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Optimized selectors (boolean only, no arrays)
  const inCart = useSelector((state) =>
    state.cart.items.some((i) => i.id === product.id)
  );

  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some((i) => i.id === product.id)
  );

  const [expanded, setExpanded] = useState(false);
  const isLongText = product.description.length > 90;

  const goToDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="card clickable-card" onClick={goToDetails}>
      {/* ❤️ WISHLIST ICON (TOP RIGHT) */}
      <button
        className="wishlist-icon"
        onClick={(e) => {
          e.stopPropagation(); // ⛔ stop navigation
          dispatch(toggleWishlist(product));
        }}
        title="Add to Wishlist"
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      {/* IMAGE */}
      <div className="image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"   // ✅ performance boost
        />
        <div className="rating-overlay">⭐ {product.rating}</div>
      </div>

      {/* CATEGORY */}
      <span className="product-category">{product.category}</span>

      {/* NAME */}
      <h4>{product.name}</h4>

      {/* DESCRIPTION */}
      <p className={`product-desc ${expanded ? "expanded" : ""}`}>
        {product.description}
      </p>

      {/* READ MORE */}
      {isLongText && (
        <span
          className="read-more"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
        >
          {expanded ? "Read less" : "Read more"}
        </span>
      )}

      {/* PRICE */}
      <p className="product-price">₹{product.price}</p>

      {/* ACTIONS */}
      <div className="card-actions">
        <button
          disabled={inCart}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
        >
          {inCart ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

/* ✅ STEP 3: MEMOIZATION */
export default React.memo(ProductCard);
