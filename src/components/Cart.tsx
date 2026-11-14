import type { CartItem } from '../types/product'

type CartProps = {
    items: CartItem[]
    onChangeQuantity: (id: number, change: number) => void
    onRemove: (id: number) => void
}

export const Cart = ({items, onChangeQuantity, onRemove } : CartProps) => {
    const total = items.reduce((sum, acc) =>  sum + acc.product.price * acc.quantity ,0)
    return (
        <section className="mt-8 rounded-lg border border-gray-200 p-4">
            <h2  className="mb-3 text-xl font-bold">Your Cart</h2>

            {
                items.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty. Add something above.</p>
                ):
                (   
                    <>
                        <ul className="divide-y">
                            {
                                items.map(item => {
                                    return (
                                        <li key={item.product.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                                            <span>{item.product.name}</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                onClick={() => onChangeQuantity(item.product.id, -1)}
                                                className="rounded border px-2">
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                onClick={() => onChangeQuantity(item.product.id, 1)}
                                                disabled={item.quantity >= item.product.stock}
                                                className="rounded border px-2 disabled:text-gray-300">
                                                    +
                                                </button>
                                            </div>
                                            <span className="w-24 text-right">
                                                ₦{(item.product.price * item.quantity).toLocaleString()}
                                            </span>
                                            <button
                                                onClick={() => onRemove(item.product.id)}
                                                className="text-sm text-red-600 underline"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                        <p className="mt-3 text-right text-lg font-bold">
                            Total: ₦{total.toLocaleString()}
                        </p>
                    </>
                )
            }
        </section>
    )
}