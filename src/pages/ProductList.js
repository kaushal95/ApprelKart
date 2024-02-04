import { useContext, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import ProductFilters from "../components/ProductFilters";
import SidebarFilter from "../components/SidebarFilter";
import { useProducts } from "../context/ProductContext";
import { useWishlist } from "../context/WishListContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductList() {
  const { token } = useAuth();
  const {
    getAllProducts,
    productState,
    getProductById,
    loading,
    filterByCategory,
    handleProductAction,
    showFilters,
    setShowFilters,
  } = useProducts();
  const { addToWishlist, removeFromWishlist, itemInWishlist } = useWishlist();
  const { addToCart, removeFromCart, updateQuantityInCart, itemInCart } =
    useCart();
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
  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="product-page">
            <div className="filter-left-container">
              <SidebarFilter />
            </div>
            <div className="product-list-layout">
              {filterByCategory.length &&
                filterByCategory.map((product) => {
                  const { _id, name, price, image, currency } = product;
                  return (
                    <div key={_id} className="product-list-outline">
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
                      {itemInCart(_id) ? (
                        <div className="btn cart-btn">
                          <button onClick={gotoCartPage}> Go to Cart </button>
                        </div>
                      ) : (
                        <div className="btn cart-btn">
                          <button
                            onClick={() =>
                              handleProductAction(600, addToCart, product)
                            }
                          >
                            {" "}
                            Add to Cart{" "}
                          </button>
                        </div>
                      )}
                      {itemInWishlist(_id) ? (
                        <div className="btn wishlist-btn">
                          <button onClick={() => {}}> Go to Wishlist </button>
                        </div>
                      ) : (
                        <div className="btn wishlist-btn">
                          <button
                            onClick={() =>
                              handleProductAction(600, addToWishlist, product)
                            }
                          >
                            {" "}
                            Add to Wishlist{" "}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
