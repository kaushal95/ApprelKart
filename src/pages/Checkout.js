import { useContext } from "react";
import { CartContext, useCart } from "../context/CartContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useWishlist } from "../context/WishListContext";
import { useAuth } from "../context/AuthContext";
export default function Checkout() {
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
    <>
      <div className="address-container">
        <form className="form address-popup">
          <h2>Add Address</h2>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="st"
            id="address"
            placeholder="Flat, House no., Building, Apartment"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="name"
            id="area"
            placeholder="Area, Street, Sector, Village"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="name"
            id="landmark"
            placeholder="Landmark E.g. near apollo hospital"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            name="pincode"
            id="pincode"
            placeholder="6 digits Pincode"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="name"
            id="state"
            placeholder="State"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Country"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="btn signup-btn"
            action="submit"
            // onClick={handleSignup}
          >
            Add Address
          </button>
          <button
            className="btn signup-btn"
            action="submit"
            // onClick={handleSignup}
          >
            Use Dummy Address
          </button>
        </form>
      </div>
      <div>
        <div className="priceblock-container">
          <div className="orderblock-orderHeader ">ORDER DETAILS</div>
          <div className="orderbreakUp-order-summary" id="orderblock">
            {cart.map((product, index) => (
              <div
                className="orderdetail-row"
                key={`${product._id}-delivery-details`}
              >
                <span className=" ">{product.name}</span>
                <span className="orderdetail-value">
                  <span></span>
                  <span>
                    {" "}
                    <span className="">₹</span>
                    {`${product.price} × ${product.qty}`}
                  </span>
                </span>
              </div>
            ))}
          </div>
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
          </div>
          <div className="deliveryblock-priceHeader">Deliver To</div>
          <div>Please Select an address to checkout.</div>
        </div>
      </div>
    </>
  );
}
