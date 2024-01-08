//~~~~~~~~ Define a reducer function for managing state related to products

const ProductReducer = (state, action) => {

  //~~~~~~~~ Switch statement to handle different action types

  switch (action.type) {

    //~~~~~~~~ Action type for setting loading state

    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    //~~~~~~~~ Action type for setting API data and extracting featured products

    case "SET_API_DATA":

      //~~~~~~~~ Filter out featured products from the payload

      const featureData = action.payload.filter((curElem) => {
        return curElem.featured === true;
      });

      //~~~~~~~~ Return updated state with API data, loading state, and featured products

      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: featureData,
      };

    //~~~~~~~~ Action type for handling API errors

    case "API_ERROR":

      //~~~~~~~~ Set error state and update loading state

      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //~~~~~~~~ Action type for setting loading state for a single product

    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    //~~~~~~~~ Action type for setting data for a single product

    case "SET_SINGLE_PRODUCT":

      //~~~~~~~~ Update state with single product data and loading state

      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    //~~~~~~~~ Action type for handling errors related to a single product

    case "SET_SINGLE_ERROR":

      //~~~~~~~~ Set error state and update loading state for a single product

      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };

    //~~~~~~~~ Default case for handling unknown action types

    default:
      return state;
  }
};

//~~~~~~~~ Export the reducer function for use in the application

export default ProductReducer;
