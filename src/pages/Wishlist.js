import { useContext } from "react";
import { WishlistContext, useWishlist } from "../context/WishListContext";

export function Wishlist() {
  const {
    wishlistState: { wishlist },
    isLoading,
  } = useWishlist();
  return (
    <div>
      <h3> {wishlist.length} items in your wishlist ❣️ </h3>
      {wishlist.map((item) => (
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
      {/* <div style={{ textAlign: "right", margin: "1rem" }}>
        Total:
        {cart.reduce((totalPrice, item) => (totalPrice += item.price), 0)}
      </div> */}
    </div>
  );
}
