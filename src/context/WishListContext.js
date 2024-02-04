import {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import wishlistReducer, {
  initialWishlistState,
} from "../reducers/wishlistReducer";
import {
  getWishlistItems,
  addItemToWishlist,
  removeItemFromWishlist,
} from "../services/wishlist";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlistState, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialWishlistState
  );

  const [isLoading, setIsLoading] = useState(false);

  const getWishlist = async () => {
    setIsLoading(true);
    try {
      const response = await getWishlistItems(token);
      if (response.status === 200) {
        const { wishlist } = await response.json();
        wishlistDispatch({ type: "DISPLAY_WISHLIST", payload: wishlist });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    try {
      const response = await addItemToWishlist(token, product);
      if (response.status === 201) {
        const { wishlist } = await response.json();
        wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: wishlist });
        toast.success(`${product.name} added to favorites!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Not able to add to favorites.");
    }
  };

  const removeFromWishlist = async ({ _id: productId }) => {
    try {
      const response = await removeItemFromWishlist(token, productId);
      if (response.status === 200) {
        const { wishlist } = await response.json();
        wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: wishlist });
        toast.success("No longer favorite plant!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to remove from favorites.");
    }
  };

  const itemInWishlist = (productId) =>
    wishlistState.wishlist.find((product) => product._id === productId);

  useEffect(() => {
    if (token) {
      getWishlist();
    }
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistState,
        wishlistDispatch,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        itemInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
