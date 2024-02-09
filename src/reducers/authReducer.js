export const initialUserState = {
  token: "",
  firstName: "",
  lastName:"",
  email: "",
  cart: [],
  wishlist: [],
  address: [],
  // orders:[]
};

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, ...payload };
    case "LOGOUT":
      return { ...state, token: "" };
    case "SIGNUP":
      return { ...state, ...payload };
    case "CART":
      return { ...state, cart: payload };
    case "WISHLIST":
      return { ...state, wishlist: payload };
    case "ADDRESS":
      return { ...state, address: payload };
  }
};
