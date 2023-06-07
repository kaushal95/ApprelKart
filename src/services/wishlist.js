const getWishlistItems = async (token) =>
  await fetch("/api/user/wishlist", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
  });

const addItemToWishlist = async (token, product) =>
  await fetch("/api/user/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
    body: JSON.stringify({ product }),
  });
const removeItemFromWishlist = async (token, itemId) =>
  await fetch(`/api/user/wishlist/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
  });

export { getWishlistItems, addItemToWishlist, removeItemFromWishlist };
