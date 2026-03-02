import CartPanel from "../components/cart/CartPanel";
import type { CartItem } from "../types";

type Props = {
  cart: CartItem[];
  onRemoveFromCart: (concertId: number) => void;
  onQtyChange: (concertId: number, qty: number) => void;
  onClearCart: () => void;
};

export default function CartPage({ cart, onRemoveFromCart, onQtyChange, onClearCart }: Props) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-6">
      <h1 className="m-0 text-2xl font-semibold text-text">Your Cart</h1>
      <p className="mt-2 text-sm text-muted">Review tickets and adjust quantities.</p>

      <div className="mt-4">
        <CartPanel items={cart} onRemove={onRemoveFromCart} onQtyChange={onQtyChange} onClear={onClearCart} />
      </div>
    </main>
  );
}