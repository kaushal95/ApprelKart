import React from 'react'
import { useProducts } from '../context/ProductContext';
function ProductFilters() {
    const {showFilters, setShowFilters} = useProducts()
  return (
      <>
        <div className="filterButtons">
            <button onClick={() => setShowFilters(true)}>Filter</button>
        </div>
            {
        showFilters ? <div className="filter-page">
            <div className="filter-head">
                <h4>Filters</h4>
                <button>Clear Filters</button>
            </div>
            <aside className="side-filter-bar">
                <div className="filter-bar">
                    Price
                </div >
                <div className="filter-bar">
                    Rating
                </div>
                <div className="filter-bar">
                    Category
                </div>

                <div className="filter-bar sort">
                    <p>
                        Price High to Low

                    </p>
                    <p>

                        Price Low to High
                    </p>
                </div>
            </aside>
            <main className="filter-inputs">
                <div className="filter-input">

                    400<input type="range" min="400" max="2000" step={50} value={2000} />2000
                    <p>2000</p>
                </div>
                <div className="filter-input">

                    <input type="range" max="5" min="1" />
                </div>
                <div className="filter-input category">
                    <div>

                        <input
                            type="checkbox"
                            id={`custom-checkbox-${0}`}
                            name="Men"
                            value="Men"
                        // checked={checkedState[index]}
                        // onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${0}`}>{"Men"}</label>
                    </div>
                    <div>

                        <input
                            type="checkbox"
                            id={`custom-checkbox-${1}`}
                            name="Women"
                            value="Women"
                        // checked={checkedState[1]}
                        // onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${1}`}>{"Women"}</label>
                    </div>
                    <div>

                        <input
                            type="checkbox"
                            id={`custom-checkbox-${2}`}
                            name="Kids"
                            value="Kids"
                        // checked={checkedState[2]}
                        // onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${2}`}>{"Kids"}</label>
                    </div>
                    <div>

                        <input
                            type="checkbox"
                            id={`custom-checkbox-${3}`}
                            name="Accessories"
                            value="Accessories"
                        // checked={checkedState[2]}
                        // onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${3}`}>{"Accessories"}</label>
                    </div>
                </div>
                <div className="filter-input sort">
                    <input type="radio" name="price-sort" value={"lowToHigh"} />
                    <input type="radio" name="price-sort" value={"highToLow"} />

                </div>
            </main>
            <div className="filter-action">

                <button onClick={() => { setShowFilters(false); }}>Apply</button>
                <button onClick={() => { setShowFilters(false); }}>Close</button>
            </div>

        </div> : null
    }
    </>
  )
}

export default ProductFilters