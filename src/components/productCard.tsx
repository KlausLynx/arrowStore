import type {Product} from "../types/product"

type ProductCardProps = {
    product: Product
    onAdd: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
    const outOfStock = product.stock === 0 
    
    return (
        <article className="rounded-lg border border-gray-200 p-3">
            <img src={product.image} alt={product.name} className="w-full rounded-md" />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="font-bold">₦{product.price.toLocaleString()}</p>
            <button
            onClick={() => onAdd(product)}
            disabled={outOfStock}
            className="mt-2 w-full rounded-md bg-black px-3 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
            >
            {outOfStock ? "Out of stock" : "Add to cart"}
            </button>
        </article>
    );
}

