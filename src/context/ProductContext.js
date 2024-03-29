import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  initialProductState,
  productReducer,
} from "../reducers/productReducer";
import {
  fetchAllProducts,
  fetchProduct,
  fetchCategories,
} from "../services/product";

export const ProductContext = createContext();
export function ProductsProvider({ children }) {
  const productActionTimer = useRef();
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialProductState
  );

  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchAllProducts();

      if (response?.status === 200) {
        const { products } = await response.json();
        productDispatch({ type: "DISPLAY_PRODUCTS", payload: products });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await fetchCategories();
      if (response?.status === 200) {
        const { categories } = await response.json();
        productDispatch({ type: "DISPLAY_CATEGORIES", payload: categories });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (productId) => {
    setLoading(true);
    try {
      const response = await fetchProduct(productId);
      if (response?.status === 200) {
        const { product } = await response.json();
        productDispatch({ type: "SET_PRODUCT_DETAILS", payload: product });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
    getCategories();
  }, []);

  const handleProductAction = (delay, callback, ...args) => {
    clearTimeout(productActionTimer.current);
    productActionTimer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  let filterByCategory = productState.categoryInput.length
    ? productState.products.filter((product) =>
        productState.categoryInput.includes(product.categoryName)
      )
    : productState.products;

  filterByCategory = filterByCategory.filter(
    (product) => productState.ratingRange >= product.rating
  );

  filterByCategory = productState.sortPriceRadioInput
    ? filterByCategory.sort((a, b) =>
        productState.sortPriceRadioInput === "lowToHigh"
          ? a.price - b.price
          : b.price - a.price
      )
    : filterByCategory;

  filterByCategory = productState.searchInput
    ? filterByCategory.filter((product) =>
        product.name
          .toLowerCase()
          .includes(productState.searchInput.toLowerCase())
      )
    : filterByCategory;

  return (
    <ProductContext.Provider
      value={{
        loading,
        getAllProducts,
        productState,
        productDispatch,
        filterByCategory,
        getProductById,
        handleProductAction,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
