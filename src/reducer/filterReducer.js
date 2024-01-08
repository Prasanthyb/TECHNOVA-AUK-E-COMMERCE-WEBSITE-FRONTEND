//~~~~~~~~~~ Reducer function for handling state related to product 
//  filtering in a Redux store

const filterReducer = (state, action) => {

  //~~~~~~~~~~~~~~~ Switch statement to handle different action types

  switch (action.type) {

    //~~~~~~~~~~~~~~~ Case for loading filter products and setting initial state

    case "LOAD_FILTER_PRODUCTS":

      //~~~~~~~~~~~~~~~~~~ Extracting prices from the payload

      let priceArr = action.payload.map((curElem) => curElem.price);

      //~~~~~~~~~~~~~~~~~ Finding the maximum price from the array of prices

      let maxPrice = Math.max(...priceArr);

      //~~~~~~~~~~~~ Updating state with filter products, all products, 
      //  and initial filter values

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    //~~~~~~~~~~~~~~~~~~~~~~~ Case for setting grid view in the UI

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    //~~~~~~~~~~~~~~~~~~~~~~~~~ Case for setting list view in the UI

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    //~~~~~~~~~~~~~~~~~~~~~~~~~ Case for getting the selected sorting value

    case "GET_SORT_VALUE":

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Updating state with the selected sorting value

      return {
        ...state,
        sorting_value: action.payload,
      };

    //~~~~~~~~~~~~~~~~~~~~~~~~~ Case for sorting products based on the selected 
    // sorting value

    case "SORTING_PRODUCTS":

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Sorting logic based on the selected sorting value

      let newSortData;
      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {

        //~~~~~~~~~~~~~~~~~~~~~~~~~ Sorting based on different criteria

        if (sorting_value === "lowest") {
          return a.price - b.price;
        }
        if (sorting_value === "highest") {
          return b.price - a.price;
        }
        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Applying sorting function to the product array

      newSortData = tempSortProduct.sort(sortingProducts);

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Updating state with the sorted 

      return {
        ...state,
        filter_products: newSortData,
      };

    //~~~~~~~~~~~~~~~~~~~~~~~~~ Case for updating filter values

    case "UPDATE_FILTERS_VALUE":

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Extracting name and value from the payload

      const { name, value } = action.payload;

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Updating state with the new filter value

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    //~~~~~~~~~~~~~~~~~~~~~~~~~ Case for filtering products based on filter criteria

    case "FILTER_PRODUCTS":

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Extracting filter criteria and all products from state

      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, company, color, price } = state.filters;

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Applying filters based on different criteria

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        });
      }
      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.category === category
        );
      }
      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
        );
      }
      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.colors.includes(color)
        );
      }
      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price == price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Updating state with filtered products

      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    //~~~~~~~~~~~~~~~~~~~~~~~~~ Case for clearing all filters

    case "CLEAR_FILTERS":

      //~~~~~~~~~~~~~~~~~~~~~~~~~ Resetting filter values to their initial state

      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };

    //~~~~~~~~~~~~~~~~~~~~~~~~~ Default case for unknown action types

    default:
      return state;
  }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~ Exporting the filter reducer function

export default filterReducer;
