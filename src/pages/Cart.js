import { useContext } from "react";
import { CartContext, useCart } from "../context/CartContext";

export function Cart() {
  const {
    cartState: { cart },
    isLoading,
  } = useCart();
  return (
    <div>
      <h3> {cart.length} items in your cart </h3>
      {cart.map((item) => (
        <div
          style={{
            border: "1px solid black",
            margin: "0.5rem",
            padding: "0.5rem",
          }}
        >
          {item.name}
        </div>
      ))}
      <div style={{ textAlign: "right", margin: "1rem" }}>
        Total:
        {cart.reduce((totalPrice, item) => (totalPrice += item.price), 0)}
      </div>
    </div>
  );
}
