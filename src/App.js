import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";
import MockMan from "mockman-js";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Profile from "./pages/Profile";

import { Header } from "./components/Header";
import Footer from "./components/Footer";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          top: "5rem",
        }}
      />
      <Header />
      <Routes>
        <Route path="/mockman" element={<MockMan />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-list/" element={<ProductList />} />
        <Route path="/product-list/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}
