import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <button
        className="wishlist-icon"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleWishlist(product));
        }}
        title="Add to Wishlist">
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      <div className="image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"  
        />
        <div className="rating-overlay">⭐ {product.rating}</div>
      </div>

      <span className="product-category">{product.category}</span>

      <h4>{product.name}</h4>

      <p className={`product-desc ${expanded ? "expanded" : ""}`}>
        {product.description}
      </p>

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

      <p className="product-price">₹{product.price}</p>

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

export default React.memo(ProductCard);
