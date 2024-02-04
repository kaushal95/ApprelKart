export const initialProductState = {
  products: [],
  allCategories: [],
  searchInput: "",
  categoryInput: [],
  sortPriceRadioInput: "",
  ratingRange: 5,
  productDetail: {},
  orderList: [],
};

export const productReducer = (state, { type, payload }) => {
  switch (type) {
    case "DISPLAY_PRODUCTS":
      return { ...state, products: payload };
    case "DISPLAY_CATEGORIES":
      return { ...state, allCategories: payload };
    case "SEARCH":
      return { ...state, searchInput: payload };
    case "CATEGORY":
      return {
        ...state,
        categoryInput: state.categoryInput.includes(payload)
          ? state.categoryInput.filter(
              (categoryType) => categoryType !== payload
            )
          : [...state.categoryInput, payload],
      };
    case "SORT_BY_PRICE":
      return { ...state, sortPriceRadioInput: payload };
    case "SORT_BY_RATING_RANGE":
      return { ...state, ratingRange: payload };
    case "CLEAR_FILTERS":
      return {
        ...initialProductState,
        products: payload.products,
        allCategories: payload.categories,
      };
    case "SET_PRODUCT_DETAILS":
      return { ...state, productDetail: payload };
    case "SET_ORDER_LIST":
      return { ...state, orderList: [...state.orderList, payload] };
    default:
      return state;
  }
};
