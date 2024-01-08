// Import necessary dependencies from React

import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontext"; // Import product context for accessing product data
import reducer from "../reducer/filterReducer"; // Import the reducer function

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Create a context for the filter state

const FilterContext = createContext();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Define the initial state for the filter context

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Create the provider component for the filter context

export const FilterContextProvider = ({ children }) => {

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Access products from the product context

  const { products } = useProductContext();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Use the reducer to manage state

  const [state, dispatch] = useReducer(reducer, initialState);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Function to set the grid view

  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Function to set the list view

  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Sorting function to handle user-selected sorting

  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Update filter values based on user input

  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Clear all filters

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Use effect to filter and sort products when products, sorting value, or filters change

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Use effect to load filtered products when products change

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Provide the filter context and its functions to the children components

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Custom hook to access the filter context values

export const useFilterContext = () => {
  return useContext(FilterContext);
};
