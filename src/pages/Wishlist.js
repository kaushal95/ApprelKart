import { useContext } from "react";
import { WishlistContext, useWishlist } from "../context/WishListContext";
import { CartContext, useCart } from "../context/CartContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
export function Wishlist() {
  const {
    wishlistState: { wishlist },
    isLoading,
    addToWishlist,
    removeFromWishlist,
    itemInWishlist,
  } = useWishlist();
  const { token } = useAuth();
  const {
    getAllProducts,
    productState,
    getProductById,
    loading,
    filterByCategory,
    handleProductAction,
  } = useProducts();
  const {
    cartState: { cart },
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
      <h3> {wishlist.length} items in your wishlist ❣️ </h3>
      <div className="product-list-layout">
        {wishlist.length &&
          wishlist.map((product) => {
            const { _id, name, price, image, currency, qty } = product;
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
                <div className="cart product-detail">
                  <p>{name}</p>
                  <div className="product-list-prices">
                    <p>Price</p>
                    <div className="price-container">
                      <span className="currency">{currency}</span>
                      <span className="price">{price}</span>
                    </div>
                  </div>
                  {itemInCart(_id) ? (
                    <button
                      className="btn cart-btn"
                      onClick={() =>
                        handleProductAction(
                          600,
                          updateQuantityInCart,
                          { _id, name },
                          { type: "increment" }
                        )
                      }
                    >
                      {" "}
                      Add to Cart{" "}
                    </button>
                  ) : (
                    <button
                      className="btn cart-btn"
                      onClick={() =>
                        handleProductAction(600, addToCart, product)
                      }
                    >
                      {" "}
                      Add to Cart{" "}
                    </button>
                  )}
                  <button
                    className="btn wishlist-btn"
                    onClick={() =>
                      handleProductAction(600, removeFromWishlist, product)
                    }
                  >
                    {" "}
                    Remove From Wishlist{" "}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
