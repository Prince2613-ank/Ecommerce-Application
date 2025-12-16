import { localProducts } from "./localProducts";

export async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const apiData = await res.json();

  const apiProducts = apiData.map((p) => ({
    id: `api-${p.id}`, // 🔑 avoid collision
    name: p.title,
    description: p.description,
    price: Math.round(p.price * 80), // INR
    rating: p.rating.rate,
    category: p.category.toUpperCase(),
    image: p.image, // API image
  }));

  // ✅ Assets FIRST, API AFTER
  return [...localProducts, ...apiProducts];
}
