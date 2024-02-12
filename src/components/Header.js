import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// import { CartContext } from "..";
import { useAuth } from "../context/AuthContext";
import { Searchbar } from "./SearchBar";
export function Header() {
  // const { cart } = useContext(CartContext);
  const { token, logoutHandler } = useAuth();
  const location = useLocation();
  console.log(location);
  console.log(token, "header");
  return (
    <div className="header-container">
      <nav>
        <div className="nav-left">
          <NavLink to="/">
            <span className="nav-title">
              Apparel<span className="color-contrast">Kart</span>
            </span>
          </NavLink>
        </div>
        {location.pathname === "/product-list/" ? <Searchbar /> : null}
        <div className="nav-right">
          {token ? (
            <NavLink to="/profile">
              <div className="nav-icon">
                <span className="material-icons-outlined">account_circle</span>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <div className="nav-icon">
                <span className="material-icons-outlined">account_circle</span>
              </div>
            </NavLink>
          )}
          <NavLink to="/wishlist">
            <div className="nav-icon">
              <span className="material-icons-outlined">favorite_border</span>
            </div>
          </NavLink>
          <NavLink to="/cart">
            <div className="nav-icon">
              <span className="material-icons-outlined">shopping_cart</span>
            </div>
          </NavLink>
          {token ? (
            <NavLink to="/login">
              <div className="nav-icon">
                <span
                  className="material-icons-outlined"
                  onClick={logoutHandler}
                >
                  logout
                </span>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <div className="badge-icon nav-badge-icon">
                <span className="material-icons-outlined">login</span>
              </div>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}
