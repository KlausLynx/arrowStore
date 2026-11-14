import type { Product } from "../types/product";

export const products: Product[] = [
  // Gadgets
  { id: 1, name: "Wireless Earbuds", price: 12000, category: "Gadgets", image: "https://placehold.co/300x200?text=Earbuds", stock: 10 },
  { id: 2, name: "10,000mAh Power Bank", price: 9500, category: "Gadgets", image: "https://placehold.co/300x200?text=Power+Bank", stock: 5 },
  { id: 3, name: "Phone Stand", price: 2500, category: "Gadgets", image: "https://placehold.co/300x200?text=Phone+Stand", stock: 0 },
  { id: 4, name: "USB Flash Drive 64GB", price: 5500, category: "Gadgets", image: "https://placehold.co/300x200?text=Flash+Drive", stock: 8 },

  // Books and stationery
  { id: 5, name: "Notebook Pack (5)", price: 3500, category: "Books & stationery", image: "https://placehold.co/300x200?text=Notebooks", stock: 20 },
  { id: 6, name: "Pen Set (12)", price: 1500, category: "Books & stationery", image: "https://placehold.co/300x200?text=Pens", stock: 15 },
  { id: 7, name: "Scientific Calculator", price: 7000, category: "Books & stationery", image: "https://placehold.co/300x200?text=Calculator", stock: 3 },
  { id: 8, name: "Highlighter Pack", price: 1800, category: "Books & stationery", image: "https://placehold.co/300x200?text=Highlighters", stock: 0 },

  // Fashion
  { id: 9, name: "Canvas Backpack", price: 9000, category: "Fashion", image: "https://placehold.co/300x200?text=Backpack", stock: 6 },
  { id: 10, name: "Plain T-Shirt", price: 4500, category: "Fashion", image: "https://placehold.co/300x200?text=T-Shirt", stock: 12 },
  { id: 11, name: "White Sneakers", price: 15000, category: "Fashion", image: "https://placehold.co/300x200?text=Sneakers", stock: 2 },
  { id: 12, name: "Baseball Cap", price: 3000, category: "Fashion", image: "https://placehold.co/300x200?text=Cap", stock: 9 },

  // Room and kitchen
  { id: 13, name: "Electric Kettle", price: 8000, category: "Room & kitchen", image: "https://placehold.co/300x200?text=Kettle", stock: 4 },
  { id: 14, name: "Desk Lamp", price: 6000, category: "Room & kitchen", image: "https://placehold.co/300x200?text=Desk+Lamp", stock: 7 },
  { id: 15, name: "Water Bottle (1L)", price: 2800, category: "Room & kitchen", image: "https://placehold.co/300x200?text=Bottle", stock: 0 },
  { id: 16, name: "Lunch Box", price: 3200, category: "Room & kitchen", image: "https://placehold.co/300x200?text=Lunch+Box", stock: 11 },
];