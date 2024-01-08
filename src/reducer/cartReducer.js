//~~~~~~~~ Define a reducer function for managing the shopping cart state

const cartReducer = (state, action) => {

  //~~~~~~~~ Switch statement to handle different action types

  switch (action.type) {

    //~~~~~~~~ Case for adding items to the cart

    case "ADD_TO_CART":

      //~~~~~~~~ Destructure payload to get necessary information

      let { id, color, amount, product } = action.payload;

      //~~~~~~~~ Check if the product is already in the cart

      let existingProduct = state.cart.find((curItem) => curItem.id === id + color);

      if (existingProduct) {

        //~~~~~~~~ If the product is in the cart, update its quantity

        let updatedProduct = state.cart.map((curElem) =>
          curElem.id === id + color
            ? {
              ...curElem,
              amount: Math.min(curElem.amount + amount, curElem.max),
            }
            : curElem
        );

        //~~~~~~~~ Return updated state with the modified cart

        return {
          ...state,
          cart: updatedProduct,
        };
      } else {

        //~~~~~~~~ If the product is not in the cart, add it

        let cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };

        //~~~~~~~~ Return updated state with the new item added to the cart

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

    //~~~~~~~~ Case for decrementing the quantity of a cart item

    case "SET_DECREMENT":

      //~~~~~~~~ Update the quantity of the specified item, 
      // ensuring it doesn't go below 1

      let updatedDecProduct = state.cart.map((curElem) =>
        curElem.id === action.payload
          ? {
            ...curElem,
            amount: Math.max(curElem.amount - 1, 1),
          }
          : curElem
      );

      //~~~~~~~~ Return updated state with the modified cart
      return { ...state, cart: updatedDecProduct };

    //~~~~~~~~ Case for incrementing the quantity of a cart item

    case "SET_INCREMENT":

      //~~~~~~~~ Update the quantity of the specified item, 
      // ensuring it doesn't exceed the maximum stock

      let updatedIncProduct = state.cart.map((curElem) =>
        curElem.id === action.payload
          ? {
            ...curElem,
            amount: Math.min(curElem.amount + 1, curElem.max),
          }
          : curElem
      );

      //~~~~~~~~ Return updated state with the modified cart

      return { ...state, cart: updatedIncProduct };

    //~~~~~~~~ Case for removing an item from the cart

    case "REMOVE_ITEM":

      //~~~~~~~~ Filter out the specified item from the cart

      let updatedCart = state.cart.filter((curItem) => curItem.id !== action.payload);

      //~~~~~~~~ Return updated state with the item removed

      return {
        ...state,
        cart: updatedCart,
      };

    //~~~~~~~~ Case for clearing the entire cart

    case "CLEAR_CART":

      //~~~~~~~~ Return state with an empty cart

      return {
        ...state,
        cart: [],
      };

    //~~~~~~~~ Case for calculating total items and total price in the cart

    case "CART_ITEM_PRICE_TOTAL":

      //~~~~~~~~ Use reduce to calculate the total items and total price

      let { total_item, total_price } = state.cart.reduce(
        (accum, curElem) => {
          let { price, amount } = curElem;
          accum.total_item += amount;
          accum.total_price += price * amount;
          return accum;
        },
        {
          total_item: 0,
          total_price: 0,
        }
      );

      //~~~~~~~~ Return state with the calculated total items and total price

      return {
        ...state,
        total_item,
        total_price,
      };

    //~~~~~~~~ Default case for unknown action types

    default:
      return state;
  }
};

//~~~~~~~~ Export the cart reducer function

export default cartReducer;
