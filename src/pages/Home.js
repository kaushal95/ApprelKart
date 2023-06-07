import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';


export default function Home() {
  const { productState, productDispatch } = useProducts()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    productDispatch({
      type: "CLEAR_FILTERS",
      payload: {
        categories: productState.allCategories,
        products: productState.products,
      },
    });
  }, [])

  const handleClick = (categoryName) => {
    const path = location.pathname + "product-list/"
    productDispatch({ type: "CATEGORY", payload: categoryName })
    navigate(path)
  }
  return (
    <main className="home-layout">
      <div className="hero-container">
        <div class="hero-container-content">
          <h2 class="hero-container-title">
            Essentials for a cold winter
          </h2>
          <span class="hero-container-subtitle"
          >Discover Autumn Winter 2021
          </span>
          <button class="btn hero-button">
            shop now
          </button>
        </div>
      </div>
      <div class="home-message">
        <p>
          This is a demonstration of the Sydney theme for verse by{" "}
          <span class="home-gold">matter design.</span>
        </p>
        <p>
          wear by <span class="home-gold">sunspel</span> and{" "}
          <span class="home-gold">scotch&amp;soda</span>
        </p>
      </div>
      <div class="home-collection-container">
        <div
          class="collections-container container-large"
        >
          <div class="collections-title-container">
            <h2 class="collections-title-">New Collection</h2>
          </div>
          <div class="product-collection-container">
            {
              productState?.allCategories.length && productState?.allCategories.map(({ _id, categoryName, image }) => (

                <div
                  key={`${_id}`}
                  role="presentation"
                  class="product-collection"
                  style={{ backgroundImage: `url(${image})` }}
                  onClick={() => handleClick(categoryName)}
                >
                  <div class="product-collection-content">
                    <span class="product-collection-title">{categoryName}</span>
                    <span class="product-collection-text">
                      SHOP NOW
                    </span>
                  </div>
                  <div class="product-collection-overlay"></div>
                </div>

              )
              )
            }
          </div>

        </div>
      </div>
      Home
    </main>
  );
}
