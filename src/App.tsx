import ProductCard from "./components/productCard";
import { Cart } from "./components/Cart";
import { products } from "./data/products";
import { useState } from "react";
import type { Category, Product, CartItem } from "./types/product";

const Categories: Category[] = [
  "Gadgets",
  "Books & stationery",
  "Fashion",
  "Room & kitchen",
]

const Option: (Category | "All")[] = ["All", ...Categories]
export default function App() {
  const [ selected, setSelected ] = useState<Category | "All" >("All");
  const [ search, setSearch ] = useState('')
  const [ cart, setCart ] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    const existing = cart.find(item =>  item.product.id === product.id)
    if (existing) {
      setCart(prev => {
        return prev.map(item => {
          return item.product.id === product.id ? {...item, quantity: item.quantity + 1 } : item
        })
      })
    }else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  }

  const changeQuantity = (id: number, change: number) => {
    setCart(prev => 
      prev.map(item => 
        item.product.id === id ?
        {...item, quantity: Math.min(item.quantity + change, item.product.stock)} : item
      )
      .filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.product.id !== id))
  }

const visibleProduct = products.filter((product) => (selected === "All" || selected === product.category) && 
product.name.toLowerCase().includes(search.toLowerCase()))

  return (
  <main className="mx-auto max-w-6xl p-4">
    <h1 className="mb-4 text-2xl font-bold">Student Store</h1>
    <p aria-live="polite" className="mb-4 font-semibold">
      Cart ({cart.length})
    </p>
      <label htmlFor="search" className="mb-1 block text-sm font-medium">
        Search products
      </label>
      <input id="search" className="mb-4 w-full rounded-md border px-3 py-2 sm:max-w-sm" type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="mb-4 flex flex-wrap gap-2">
        {
          Option.map(name => (
            <button 
            className={`rounded-full me-2 border px-4 py-1 text-sm cursor-pointer ${
                  selected === name ? "bg-black text-white" : "bg-white"
                }`}
            key={name} 
            onClick={() => setSelected(name) }>
              {name}
            </button>
          ))
        }
      </div>

      {
        visibleProduct.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No products match your search.
          </p>
        ) :
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-3">
          {
            visibleProduct.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))
          }
        </div>
      }

      <Cart
        items={cart}
        onChangeQuantity={changeQuantity}
        onRemove={removeFromCart}
      />
  </main>
  );
}