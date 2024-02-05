import React from "react";
import { useProducts } from "../context/ProductContext";
function SidebarFilter() {
  const {
    productState,
    filterByCategory,
    sortByPrice,
    filterByRating,
    productDispatch,
  } = useProducts();
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-head">
          <h4>Filters</h4>
          <button
            onClick={() =>
              productDispatch({
                type: "CLEAR_FILTERS",
                payload: {
                  categories: productState.allCategories,
                  products: productState.products,
                },
              })
            }
          >
            Clear Filters
          </button>
        </div>
        <div className="sidebar-filters">
          <div className="sidebar-filter-container">
            <div className="filter-text">Rating</div>
            <div className="filter-input">
              1⭐{" "}
              <input
                type="range"
                max="5"
                min="1"
                step={1}
                value={productState.ratingRange}
                onChange={(e) => {
                  productDispatch({
                    type: "SORT_BY_RATING_RANGE",
                    payload: e.target.value,
                  });
                }}
              />{" "}
              5⭐
            </div>
          </div>
          <div className="sidebar-filter-container">
            <div className="filter-text">Category</div>
            <div className="filter-input category">
              {productState.allCategories.map((category, index) => (
                <div key={`category-${index}`}>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={category.categoryName}
                    value={category.categoryName}
                    checked={productState.categoryInput.includes(
                      category.categoryName
                    )}
                    onChange={() => {
                      productDispatch({
                        type: "CATEGORY",
                        payload: category.categoryName,
                      });
                    }}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>
                    {category.categoryName}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="sidebar-filter-container">
            <div className="filter-input sort low-high">
              <p>Price Low to High</p>
              <input
                type="radio"
                name="price-sort"
                value={"lowToHigh"}
                checked={productState.sortPriceRadioInput === "lowToHigh"}
                onChange={(e) => {
                  productDispatch({
                    type: "SORT_BY_PRICE",
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="filter-input sort high-low">
              <p>Price High to Low</p>
              <input
                type="radio"
                name="price-sort"
                value={"highToLow"}
                checked={productState.sortPriceRadioInput === "highToLow"}
                onChange={(e) => {
                  productDispatch({
                    type: "SORT_BY_PRICE",
                    payload: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarFilter;
