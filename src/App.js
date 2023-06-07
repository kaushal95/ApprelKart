import ProductList from "./pages/ProductList";
import { Cart } from "./pages/Cart";
import "./styles.css";
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";
import Product from "./pages/Product";
import Home from "./pages/Home";
import MockMan from "mockman-js";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

export default function App() {
  return (
    <div className="App">
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
      </Routes>
    </div>
  );
}
