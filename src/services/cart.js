const getCartItems = async (token) =>
  await fetch("/api/user/cart", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
  });

const addItemToCart = async (token, product) =>
  await fetch("/api/user/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
    body: JSON.stringify({ product }),
  });
const removeItemFromCart = async (token, itemId) =>
  await fetch(`/api/user/cart/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
  });
const updateCartItem = async (token, itemId, action) =>
  await fetch(`/api/user/cart/${itemId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
    body: JSON.stringify({ action }),
  });

export { getCartItems, addItemToCart, removeItemFromCart, updateCartItem };
