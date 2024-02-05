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
  const totalCartPrice = cart.reduce(
    (totalPrice, item) => (totalPrice += item.price * item.qty),
    0
  );
  const shippingFee = totalCartPrice >= 1000 ? 0 : 60;
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

                  <div className="product-quantity-container">
                    <p className="qty-label">Quantity </p>
                    <div className="qty-btns">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleProductAction(
                            600,
                            updateQuantityInCart,
                            { _id, name },
                            { type: "increment" }
                          )
                        }
                      >
                        {" + "}{" "}
                      </button>
                      <span className="qty-value">{qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleProductAction(
                            600,
                            updateQuantityInCart,
                            { _id, name },

                            { type: "decrement" }
                          )
                        }
                      >
                        {" - "}{" "}
                      </button>
                    </div>
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
                      onClick={() =>
                        handleProductAction(600, addToCart, product)
                      }
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
              </div>
            );
          })}
      </div>

      <div className="priceblock-container">
        <div className="priceblock-priceHeader">
          PRICE DETAILS ({cart.length} Items)
        </div>
        <div className="pricebreakUp-order-summary" id="priceBlock">
          <div className="pricedetail-row ">
            <span className=" ">Total MRP</span>
            <span className="pricedetail-value">
              <span></span>
              <span>
                {" "}
                <span className="">₹</span>
                {totalCartPrice}
              </span>
            </span>
          </div>
          <div className="pricedetail-row ">
            <span className=" ">Discount on MRP</span>
            <span className="pricedetail-value pricedetail-discount">
              <span>
                {" "}
                <span className="">₹</span>0
              </span>
            </span>
          </div>
          <div className="pricedetail-row ">
            <span>Shipping Fee</span>
            <span className="pricedetail-value">
              <span className="pricedetail-discount">
                {" "}
                <span className="">₹</span>
                {shippingFee}
              </span>
            </span>
          </div>
          <div className="pricedetail-total ">
            <span className=" ">Total Amount</span>
            <span className="pricedetail-value">
              <span></span>
              <span>
                {" "}
                <span className="pricedetail-rupee-total-icon">₹</span>
                {totalCartPrice + shippingFee}
              </span>
            </span>
          </div>
          <div>
            <button
              className="btn checkout-btn"
              // onClick={() => handleProductAction(600, removeFromCart, product)}
            >
              {" "}
              Checkout{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
