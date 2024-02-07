import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { CartContext, CartProvider } from "./context/CartContext";
import { ProductsProvider, ProductContext } from "./context/ProductContext";
import { WishlistContext, WishlistProvider } from "./context/WishListContext";
export { CartContext, AuthContext, WishlistContext, ProductContext };

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      <ProductsProvider>
        <WishlistProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </WishlistProvider>
      </ProductsProvider>
    </AuthProvider>
  </Router>
);
