interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  abv: number; // Alcohol By Volume, in %
  quantity: number;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock"; // stricter enum type
  emoji: string;
}

export { Product };
