import { products } from "./products";
import type { Product } from "../types/product";

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (new URLSearchParams(window.location.search).has("fail")) {
        reject(new Error("Network error"));
      } else {
        resolve(products);
      }
    }, 1000);
  });
}