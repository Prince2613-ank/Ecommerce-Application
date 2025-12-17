import { localProducts } from "./localProducts";

export async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const apiData = await res.json();

  const apiProducts = apiData.map((p) => ({
    id: `api-${p.id}`,
    name: p.title,
    description: p.description,
    price: Math.round(p.price * 80),
    rating: p.rating.rate,
    category: p.category.toUpperCase(),
    image: p.image, 
  }));

  return [...localProducts, ...apiProducts];
}
