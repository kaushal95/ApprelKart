import { useContext } from "react";
import { CartContext, useCart } from "../context/CartContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useWishlist } from "../context/WishListContext";
import { useAuth } from "../context/AuthContext";
export function Cart() {
  const { token } = useAuth();
  const {
    getAllProducts,
    productState,
    getProductById,
    loading,
    filterByCategory,
    handleProductAction,
  } = useProducts();
  const { addToWishlist, removeFromWishlist, itemInWishlist } = useWishlist();
  const {
    cartState: { cart },
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantityInCart,
    itemInCart,
  } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = async (productId) => {
    const path = location.pathname + productId;
    await getProductById(productId);
    navigate(path);
  };
  const gotoCartPage = () => {
    navigate("/cart");
  };
  const gotoWishlistPage = () => {
    navigate("/wishlist");
  };

  return (
    <div>
      {/* {
        cart.length ? cart.length === 1 "item" : cart.length > 1? "items" : No
      } */}
      <h3> {cart.length} items in your cart </h3>
      <div className="product-list-layout">
        {cart.length &&
          cart.map((product) => {
            const { _id, name, price, image, currency, qty } = product;
            console.log(product.qty);
            return (
              <div
                key={_id}
                style={{
                  border: "1px solid black",
                  margin: "0.5rem",
                  padding: "0.5rem",
                }}
                className="product-list-outline"
              >
                <div
                  className="product-list img-container"
                  onClick={() => handleClick(_id)}
                >
                  <img src={image} alt={`${_id}`} />
                </div>
                <p>{name}</p>
                <div className="product-list-prices">
                  <span className="currency">{currency}</span>
                  <span className="price">{price}</span>
                </div>

                <div className="product-quantity-container">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleProductAction(
                        600,
                        updateQuantityInCart,
                        { _id, name },
                        "increment"
                      )
                    }
                  >
                    {" + "}{" "}
                  </button>
                  <span>{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleProductAction(
                        600,
                        updateQuantityInCart,
                        { _id, name },
                        "decrement"
                      )
                    }
                  >
                    {" - "}{" "}
                  </button>
                </div>
                {itemInCart(_id) ? (
                  <button
                    className="btn cart-btn"
                    onClick={() =>
                      handleProductAction(600, removeFromCart, product)
                    }
                  >
                    {" "}
                    Remove From Cart{" "}
                  </button>
                ) : (
                  <button
                    className="btn cart-btn"
                    onClick={() => handleProductAction(600, addToCart, product)}
                  >
                    {" "}
                    Add to Cart{" "}
                  </button>
                )}
                {itemInWishlist(_id) ? (
                  <button
                    className="btn wishlist-btn"
                    onClick={gotoWishlistPage}
                  >
                    {" "}
                    Go to Wishlist{" "}
                  </button>
                ) : (
                  <button
                    className="btn wishlist-btn"
                    onClick={() =>
                      handleProductAction(600, addToWishlist, product)
                    }
                  >
                    {" "}
                    Add to Wishlist{" "}
                  </button>
                )}
              </div>
            );
          })}
      </div>
      <div style={{ textAlign: "right", margin: "1rem" }}>
        Total:
        {cart.reduce((totalPrice, item) => (totalPrice += item.price), 0)}
      </div>
    </div>
  );
}
