import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function Home() {
  const { productState, productDispatch } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    productDispatch({
      type: "CLEAR_FILTERS",
      payload: {
        categories: productState.allCategories,
        products: productState.products,
      },
    });
  }, []);

  const handleClick = (categoryName) => {
    const path = location.pathname + "product-list/";
    productDispatch({ type: "CATEGORY", payload: categoryName });
    navigate(path);
  };
  return (
    <main className="home-layout">
      <div className="hero-container">
        <div className="hero-container-content">
          <h2 className="hero-container-title">Essentials for a cold winter</h2>
          <span className="hero-container-subtitle">
            Discover Autumn Winter 2023
          </span>
          <button className="btn hero-button">shop now</button>
        </div>
      </div>
      <div className="home-message">
        <p>
          This is a demonstration of the Sydney theme for verse by{" "}
          <span className="home-gold">matter design.</span>
        </p>
        <p>
          wear by <span className="home-gold">sunspel</span> and{" "}
          <span className="home-gold">scotch&amp;soda</span>
        </p>
      </div>
      <div className="home-collection-container">
        <div className="collections-container container-large">
          <div className="collections-title-container">
            <h2 className="collections-title-">New Collection</h2>
          </div>
          <div className="product-collection-container">
            {productState?.allCategories.length &&
              productState?.allCategories.map(
                ({ _id, categoryName, image }) => (
                  <div
                    key={`${_id}`}
                    role="presentation"
                    className="product-collection"
                    style={{ backgroundImage: `url(${image})` }}
                    onClick={() => handleClick(categoryName)}
                  >
                    <div className="product-collection-content">
                      <span className="product-collection-title">
                        {categoryName}
                      </span>
                      <span className="product-collection-text">SHOP NOW</span>
                    </div>
                    <div className="product-collection-overlay"></div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </main>
  );
}
