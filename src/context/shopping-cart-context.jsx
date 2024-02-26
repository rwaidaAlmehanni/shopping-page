import React, { createContext, useState } from 'react'
import { DUMMY_PRODUCTS } from '../dummy-products.js'


//context is thing in react we can use to solve the problem of props drilling or sending props in many levels
// so you can generate general context and use data there from any where but component or its parent should wrapped with this context
// by using createContext function we can create it and var should be capital coz it will used as component
// we can send any data throw the value prop and also we need to use the provider function to let wrapped component to access context

export const CartItemContext = createContext({
    items: [],
    onAddItemToCart: () => { },
    onUpdateCartItemQuantity: () => { },   
})

const CartItemContextComponent = ({ children }) => { 
    const [shoppingCart, setShoppingCart] = useState({
    items: [],
    });
    
     function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
     }

     function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
     }
    
    const contextValueProps = {
        items: shoppingCart.items,
        onAddItemToCart: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
    }

    return (
        <CartItemContext.Provider value={ contextValueProps }>
            { children }
        </CartItemContext.Provider>
    )
}
export default CartItemContextComponent