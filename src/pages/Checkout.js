import { useContext, useState } from "react";
import { CartContext, useCart } from "../context/CartContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useWishlist } from "../context/WishListContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
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
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    houseNo: "",
    area: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

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

  const handleAddressInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newAddress = { ...address, [name]: e.target.value };
    setAddress(newAddress);
  };

  const handleAdressAdd = (e) => {
    e.preventDefault();
    if (
      !address.name ||
      !address.houseNo ||
      !address.area ||
      !address.pincode ||
      !address.state ||
      !address.country ||
      !address.city
    ) {
      toast({
        message: `Please enter complete address`,
      });
    }
  };
  const handleDummyAddress = (e) => {
    e.preventDefault();

    const dummyAddress = {
      name: "John Doe",
      houseNo: "125",
      area: "Akshya Nagar 1st Block, Rammurthy nagar",
      landmark: "1st Cross",
      city: "Bangalore",
      state: "Karnataka",
      pincode: 560016,
      country: "India",
    };
    setAddress(dummyAddress);
  };
  return (
    <>
      <button className="btn add-address-btn" onClick={() => setOpen(true)}>
        Add Address +
      </button>
      {open ? (
        <div className="address-container">
          <form className="form address-popup">
            <span
              className="material-icons-outlined close-icon"
              onClick={() => setOpen(false)}
            >
              close
            </span>
            <h2>Add Address</h2>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={address.name}
              onChange={(e) => handleAddressInput(e)}
            />
            <input
              type="text"
              name="houseNo"
              id="houseNo"
              placeholder="Flat, House no., Building, Apartment"
              value={address.houseNo}
              onChange={(e) => handleAddressInput(e)}
            />
            <input
              type="text"
              name="area"
              id="area"
              placeholder="Area, Street, Sector, Village"
              value={address.area}
              onChange={(e) => handleAddressInput(e)}
            />
            <input
              type="text"
              name="landmark"
              id="landmark"
              placeholder="Landmark E.g. near apollo hospital"
              value={address.landmark}
              onChange={(e) => handleAddressInput(e)}
            />
            <input
              type="number"
              name="pincode"
              id="pincode"
              placeholder="6 digits Pincode"
              value={address.pincode}
              onChange={(e) => handleAddressInput(e)}
            />
            <input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              value={address.state}
              onChange={(e) => handleAddressInput(e)}
            />
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              value={address.city}
              onChange={(e) => handleAddressInput(e)}
            />
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              value={address.country}
              onChange={(e) => handleAddressInput(e)}
            />
            <button
              className="btn signup-btn"
              action="submit"
              onClick={handleAdressAdd}
            >
              Add Address
            </button>
            <button
              className="btn signup-btn"
              action="submit"
              onClick={handleDummyAddress}
            >
              Use Dummy Address
            </button>
          </form>
        </div>
      ) : null}

      <div>
        <div className="priceblock-container">
          <div className="orderblock-container">
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
          <div className="deliveryblock-container">
            <div className="deliveryblock-deliveryHeader">Deliver To</div>
            <div>Please Select an address to checkout.</div>
          </div>
        </div>
      </div>
    </>
  );
}
