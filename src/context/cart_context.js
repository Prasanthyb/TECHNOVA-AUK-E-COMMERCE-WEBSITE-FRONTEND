// Importing necessary React hooks and components for managing state in the context

import { createContext, useContext, useReducer, useEffect } from "react";

// Importing the reducer function to manage state updates

import reducer from "../reducer/cartReducer";

//~~~~~~~~ Creating a context to provide and consume the cart 
//  state throughout the application

const CartContext = createContext();

//~~~~~~~~ Function to get local cart data from localStorage

const getLocalCartData = () => {

  //~~~~~~~~ Retrieve cart data from localStorage

  let localCartData = localStorage.getItem("techCart");

  //~~~~~~~~ Check if localCartData is null or undefined, return an empty array; 
  // otherwise, parse and return the data

  if (!localCartData || localCartData === "[]") {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};



//~~~~~~~~ Initial state for the cart context, including cart items, total items, 
//          total price, and shipping fee

const initialState = {
  cart: getLocalCartData(),
  total_item: 0,
  total_price: 0,
  shipping_fee: 50000,
};


//~~~~~~~~ CartProvider component using useReducer to manage state and providing 
//       necessary actions to manipulate the state

const CartProvider = ({ children }) => {

  //~~~~~~~~ Destructuring state and dispatch from useReducer

  const [state, dispatch] = useReducer(reducer, initialState);

  //~~~~~~~~ Action to add an item to the cart

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  //~~~~~~~~ Actions to increment and decrement the quantity of a product in the cart

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  //~~~~~~~~ Action to remove an individual item from the cart

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  //~~~~~~~~ Action to clear the entire cart

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  //~~~~~~~~ Effect to update localStorage whenever the cart state changes

  useEffect(() => {

    //~~~~~~~~ Dispatch actions to update total items, total price, and item price total


    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    //~~~~~~~~ Store the updated cart in localStorage

    localStorage.setItem("thapaCart", JSON.stringify(state.cart));
  }, [state.cart]);

  //~~~~~~~~ Provide the state and actions to the context

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
      }}>
      {children}
    </CartContext.Provider>
  );
};

//~~~~~~~~ Custom hook to easily access the cart context in functional components

const useCartContext = () => {
  return useContext(CartContext);
};

//~~~~~~~~ Exporting the CartProvider and useCartContext for 
//            use in other parts of the application

export { CartProvider, useCartContext };
