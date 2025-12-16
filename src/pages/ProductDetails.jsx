import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { fetchProducts } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const cartItems = useSelector((state) => state.cart.items);

  const alreadyInCart = cartItems.find(
    (item) => item.id === id
  );

  useEffect(() => {
    let mounted = true;

    fetchProducts()
      .then((data) => {
        if (!mounted) return;

        const found = data.find((p) => p.id === id);
        setProduct(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (alreadyInCart) {
      navigate("/cart");
      return;
    }
    dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container product-detail-page">
      <div className="product-detail-card">
        {/* IMAGE */}
        <div className="product-detail-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src = "/images/placeholder.png";
            }}
          />
        </div>

        <div className="product-detail-info">
          <h2>{product.name}</h2>

          <p className="category">{product.category}</p>

          <p className="rating">⭐ {product.rating} / 5</p>

          <h3 className="price">₹{product.price}</h3>

          <p className="description">
            {product.description}
          </p>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            {alreadyInCart ? "Go to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
