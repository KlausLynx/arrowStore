import type { Product } from "../types/product";

type ProductCardProps = {
    product: Product;
    onAdd: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
    const outOfStock = product.stock === 0;
    const lowStock = product.stock > 0 && product.stock <= 3;

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="relative overflow-hidden">
            <img
            src={product.image}
            alt={product.name}
            width={600}
            height={450}
            loading="lazy"
            className={`aspect-4/3 w-full object-cover transition duration-300 group-hover:scale-105 ${
                outOfStock ? "opacity-50 grayscale" : ""
            }`}
            />
            {outOfStock && (
            <span className="absolute left-2 top-2 rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                Sold out
            </span>
            )}
            {lowStock && (
            <span className="absolute left-2 top-2 rounded-full bg-amber-300 px-2.5 py-0.5 text-xs font-semibold text-slate-900">
                Only {product.stock} left
            </span>
            )}
        </div>

        <div className="flex flex-1 flex-col p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            {product.category}
            </p>
            <h3 className="mt-1 font-semibold leading-snug">{product.name}</h3>
            <p className="mt-1 text-lg font-extrabold">
            ₦{product.price.toLocaleString()}
            </p>

            <div className="mt-auto pt-3">
            <button
                onClick={() => onAdd(product)}
                disabled={outOfStock}
                className="w-full rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-slate-200"
            >
                {outOfStock ? "Out of stock" : "Add to cart"}
            </button>
            </div>
        </div>
        </article>
    );
}