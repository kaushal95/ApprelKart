import {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
} from "../services/cart";
import cartReducer, { initialCartState } from "../reducers/cartReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [isLoading, setIsLoading] = useState(false);

  const fixedDiscount = 25;
  const getCart = async () => {
    setIsLoading(true);
    try {
      const response = await getCartItems(token);

      if (response.status === 200) {
        const { cart } = await response.json();
        cartDispatch({ type: "DISPLAY_CART", payload: cart });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await addItemToCart(token, product);

      if (response.status === 201) {
        const { cart } = await response.json();
        cartDispatch({ type: "ADD_TO_CART", payload: cart });
        // toast.success(`${product.title} added to cart successfully!`);
      }
    } catch (error) {
      console.error(error);
      //   toast.error("Not able to add to cart.");
    }
  };

  const removeFromCart = async ({ _id: productId, title }) => {
    try {
      const response = await removeItemFromCart(productId, token);

      if (response.status === 200) {
        const { cart } = await response.json();
        cartDispatch({ type: "REMOVE_FROM_CART", payload: cart });
        // toast.success(`${title} removed from cart successfully!`);
      }
    } catch (error) {
      console.error(error);
      //   toast.error("Unable to remove from cart.");
    }
  };

  const updateQuantityInCart = async (
    { _id: productId, title },
    actionType
  ) => {
    try {
      const response = await updateCartItem(token, productId, actionType);

      if (response.status === 200) {
        const { cart } = await response.json();
        cartDispatch({ type: "UPDATE_QUANTITY_IN_CART", payload: cart });
        // toast.success(
        //   actionType === "increment"
        //     ? `Added one more ${title} to the cart sucessfully!`
        //     : `Removed one ${title} from cart successfully!`
        // );
      }
    } catch (error) {
      console.error(error);
      //   toast.error("Unable to update quantity.");
    }
  };

  const itemInCart = (productId) =>
    cartState.cart.find((product) => product._id === productId);

  const isQuantityZeroInCart = (product) => product.qty === 0;

  const clearCart = () => {
    cartState.cart.forEach((product) => {
      removeFromCart(product);
    });
  };

  const totalPriceWithoutDiscount = cartState.cart.reduce(
    (acc, curr) => acc + curr.updatedPrice * curr.qty,
    0
  );
  const totalDiscount = cartState.cart.reduce(
    (acc, curr) => acc + curr.qty * fixedDiscount,
    0
  );
  const totalCheckoutAmount = totalPriceWithoutDiscount - totalDiscount;

  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartState,
        cartDispatch,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantityInCart,
        itemInCart,
        isQuantityZeroInCart,
        totalPriceWithoutDiscount,
        totalDiscount,
        totalCheckoutAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
