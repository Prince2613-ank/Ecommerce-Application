import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../data/products";

export default function Products() {
  const [loading, setLoading] = useState(true);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState(0);

  // 🛍 Products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetchProducts()
      .then((data) => {
        setProducts(data); // ✅ normalized FakeStore products
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ STRICT FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.price <= maxPrice &&
      Number(p.rating) >= minRating
    );
  });

  return (
    <div className="container">
      <h1>Products</h1>

      <div className="filters fancy-filters">
        <input
          type="search"
          placeholder="🔍 Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="price-filter">
          <span>Max Price: ₹{maxPrice}</span>
          <input
            type="range"
            min="500"
            max="100000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          <option value={0}>All Ratings</option>
          <option value={1}>⭐ 1 & above</option>
          <option value={2}>⭐ 2 & above</option>
          <option value={3}>⭐ 3 & above</option>
          <option value={4}>⭐ 4 & above</option>
        </select>
      </div>

      {/* ================= LOADING ================= */}
      {loading ? (
        <div className="products-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton"></div>
          ))}
        </div>
      ) : (
        <>
          {/* ================= PRODUCTS ================= */}
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* ================= EMPTY STATE ================= */}
          {filteredProducts.length === 0 && (
            <p className="no-results">
              😕 No products match your current filters.
            </p>
          )}
        </>
      )}
    </div>
  );
}
