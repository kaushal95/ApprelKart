import { useState } from "react";
import { useProducts } from "../context/ProductContext";
export function Searchbar() {
  const { loading, productState, productDispatch } = useProducts();

  const [text, setText] = useState(productState.searchInput);
  const handleChange = (e) => {
    setText(e.target.value);
    const searchText = e.target.value;
    productDispatch({
      type: "SEARCH",
      payload: searchText,
    });
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search here 🔍"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}
