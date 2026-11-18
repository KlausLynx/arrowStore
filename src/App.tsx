import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Cart } from "./components/Cart";
import Checkout from "./components/Checkout";
import { fetchProducts } from "./data/api";
import type { CartItem, Category, Product } from "./types/product";

const categories: Category[] = [
  "Gadgets",
  "Books & stationery",
  "Fashion",
  "Room & kitchen",
];

const options: (Category | "All")[] = ["All", ...categories];

export default function App() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [selected, setSelected] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  function loadProducts() {
    fetchProducts()
      .then((data) => {
        setAllProducts(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }

  useEffect(() => {
    loadProducts();
    }, []);

  function retry() {
    setStatus("loading");
    loadProducts();
  }

  function addToCart(product: Product) {
    setOrderPlaced(false);
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  }

  function changeQuantity(id: number, change: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? {
                ...item,
                quantity: Math.min(item.quantity + change, item.product.stock),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  }

  function placeOrder() {
    setCart([]);
    setOrderPlaced(true);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const visibleProducts = allProducts.filter(
    (product) =>
      (selected === "All" || product.category === selected) &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

    return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-20 focus:rounded focus:bg-white focus:p-2"
      >
        Skip to products
      </a>

      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-extrabold tracking-tight text-indigo-600">
            Student<span className="text-slate-900">Store</span>
          </h1>
          <a
            href="#cart"
            className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <span aria-hidden="true">🛒</span> Cart
            <span className="rounded-full bg-white px-2 text-indigo-600">
              {totalItems}
            </span>
          </a>
        </div>
      </header>

      <p className="sr-only" aria-live="polite">
        Cart has {totalItems} items
      </p>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Everything a student needs, on a budget.
          </h2>
          <p className="mt-1 text-indigo-100">
            Gadgets, books, fashion and room essentials at student-friendly prices.
          </p>
          <label htmlFor="search" className="sr-only">
            Search products
          </label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, e.g. earbuds"
            className="mt-4 w-full rounded-full border-0 bg-white px-5 py-3 text-slate-900 shadow-lg placeholder:text-slate-500 sm:max-w-md"
          />
        </section>

        {orderPlaced && (
          <p
            role="status"
            className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 font-medium text-green-800"
          >
            ✅ Order placed! Thank you for shopping with us.
          </p>
        )}

        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section id="products" tabIndex={-1} className="min-w-0 outline-none">
            <div
              role="group"
              aria-label="Filter by category"
              className="mb-4 flex flex-wrap gap-2"
            >
              {options.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelected(category)}
                  aria-pressed={selected === category}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:text-sm ${
                    selected === category
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-indigo-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {status === "loading" && (
              <>
                <p role="status" className="sr-only">
                  Loading products...
                </p>
                <div
                  aria-hidden="true"
                  className="grid grid-cols-2 gap-4 md:grid-cols-3"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                      <div className="aspect-[4/3] bg-slate-200" />
                      <div className="space-y-2 p-3">
                        <div className="h-3 w-1/3 rounded bg-slate-200" />
                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                        <div className="h-9 rounded-xl bg-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
              >
                <p className="font-semibold text-red-700">
                  Couldn't load products.
                </p>
                <p className="mt-1 text-sm text-red-600">
                  Check your connection and try again.
                </p>
                <button
                  onClick={retry}
                  className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                >
                  Try again
                </button>
              </div>
            )}

            {status === "ready" &&
              (visibleProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <p className="text-3xl" aria-hidden="true">🔍</p>
                  <p className="mt-2 font-semibold">No products found</p>
                  <p className="text-sm text-slate-500">
                    Try a different word or category.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={addToCart}
                    />
                  ))}
                </div>
              ))}
          </section>

          <aside id="cart" className="lg:sticky lg:top-20 lg:self-start">
            <Cart
              items={cart}
              onChangeQuantity={changeQuantity}
              onRemove={removeFromCart}
            />
            {cart.length > 0 && <Checkout onSuccess={placeOrder} />}
          </aside>
        </div>
      </main>
    </div>
  );
}