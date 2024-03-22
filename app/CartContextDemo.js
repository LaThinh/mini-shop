"use client";

import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();



const initialState = {
    cart: [{}],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            console.log("Add to cart payload");
            console.log(action.payload);
            return {
                cart: [...state.cart, action.payload],
            };
        case 'UPDATE_QUANTITY':
            console.log("Gia tri Cart");
            console.log(state.cart);
            console.log(action.payload);
        // return {
        //     cart: [...state.cart, action.payload],
        // }
        default:
            return state;
    }
};


export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    //const [cartQuantity, setCartQuantity] = useState(0);

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });

    };

    const updateQty = (product) => {
        console.log("updateQty");
        dispatch({ type: 'UPDATE_QUANTITY', payload: product });
    }

    // const updateCartQuantity = () => {
    //     const cartItems = JSON.parse(localStorage.getItem('mCart')) || [];
    //     const totalQuantity = cartItems.reduce(
    //         (acc, item) => acc + item.quantity,
    //         0
    //     );
    //     setCartQuantity(totalQuantity);
    // };

    // useEffect(() => {
    //     updateCartQuantity();
    //     window.addEventListener('storage', updateCartQuantity);

    //     return () => {
    //         window.removeEventListener('storage', updateCartQuantity);
    //     };
    // }, []);

    return (
        <CartContext.Provider value={{ cart: state.cart, addToCart, updateQty }}>
            {children}
        </CartContext.Provider>
    );
};