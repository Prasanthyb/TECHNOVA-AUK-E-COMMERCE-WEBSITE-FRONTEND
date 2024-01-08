//~~~~~~~~~~ Importing necessary dependencies from React and Axios

import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

//~~~~~~~~~~  Importing the product reducer to manage state

import ProductReducer from "../reducer/productReducer";

//~~~~~~~~~~  Creating a context for the application

const AppContext = createContext();

//~~~~~~~~~~  API endpoint for fetching products

const API = "https://api.pujakaitem.com/api/products";

//~~~~~~~~~~  Initial state for the application

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

//~~~~~~~~~~  AppProvider component that wraps the entire application

const AppProvider = ({ children }) => {

  //~~~~~~~~~~  Using the ProductReducer to manage state

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  //~~~~~~~~~~  Function to fetch products from the API

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {

      //~~~~~~~~~~  Making a GET request to the specified URL

      const res = await axios.get(url);
      const products = await res.data;

      //~~~~~~~~~~  Dispatching action to set the fetched data in the state

      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {

      //~~~~~~~~~~  Dispatching action in case of an error during the API call

      dispatch({ type: "API_ERROR" });
    }
  };

  //~~~~~~~~~~  Function to fetch a single product from the API

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {

      //~~~~~~~~~~  Making a GET request to the specified URL for a single product

      const res = await axios.get(url);
      const singleProduct = await res.data;

      //~~~~~~~~~~  Dispatching action to set the single product in the state

      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {

      //~~~~~~~~~~  Dispatching action in case of an error during the
      //  single product API call

      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  //~~~~~~~~~~  useEffect hook to fetch products when the component mounts

  useEffect(() => {
    getProducts(API);
  }, []);

  //~~~~~~~~~~  Providing the state and the getSingleProduct 
  //            function to the context

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

//~~~~~~~~~~  Custom hook for consuming the AppContext

const useProductContext = () => {
  return useContext(AppContext);
};

// Exporting the AppProvider, AppContext, and useProductContext 
// for use in other parts of the application

export { AppProvider, AppContext, useProductContext };
