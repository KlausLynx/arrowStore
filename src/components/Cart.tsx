import type { CartItem } from "../types/product";

type CartProps = {
    items: CartItem[];
    onChangeQuantity: (id: number, change: number) => void;
    onRemove: (id: number) => void;
};

    export function Cart({ items, onChangeQuantity, onRemove }: CartProps) {
    const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <section
        aria-labelledby="cart-heading"
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
        <h2 id="cart-heading" className="text-lg font-bold">
            Your cart
        </h2>

        {items.length === 0 ? (
            <div className="py-8 text-center">
            <p className="text-3xl" aria-hidden="true">🛒</p>
            <p className="mt-2 text-sm text-slate-500">
                Your cart is empty. Add something you like.
            </p>
            </div>
        ) : (
            <>
            <ul className="mt-3 divide-y divide-slate-100">
                {items.map(({ product, quantity }) => (
                <li key={product.id} className="py-3">
                    <div className="flex justify-between gap-2">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-sm font-bold">
                        ₦{(product.price * quantity).toLocaleString()}
                    </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-slate-300">
                        <button
                        aria-label={`Decrease ${product.name}`}
                        onClick={() => onChangeQuantity(product.id, -1)}
                        className="h-8 w-8 rounded-full hover:bg-slate-100"
                        >
                        −
                        </button>
                        <span className="w-8 text-center text-sm">{quantity}</span>
                        <button
                        aria-label={`Increase ${product.name}`}
                        onClick={() => onChangeQuantity(product.id, 1)}
                        disabled={quantity >= product.stock}
                        className="h-8 w-8 rounded-full hover:bg-slate-100 disabled:text-slate-300 disabled:hover:bg-transparent"
                        >
                        +
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(product.id)}
                        className="text-xs font-medium text-red-600 hover:underline"
                    >
                        Remove
                    </button>
                    </div>
                </li>
                ))}
            </ul>

            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="font-medium">Total</span>
                <span className="text-xl font-extrabold">
                ₦{total.toLocaleString()}
                </span>
            </div>
            </>
        )}
        </section>
    );
}