"use client";
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            console.log("Add Cart");
            console.log(action.payload);

            const existingItemIndex = state.findIndex(item => item.productId === action.payload.productId);
            if (existingItemIndex !== -1) {

                const updatedCart = [...state];
                updatedCart[existingItemIndex].qty = action.payload.qty;
                return updatedCart;
            } else {
                return [...state, action.payload];
            }
        case 'REMOVE_ITEM':
            return state.filter(item => item.productId !== action.payload.productId);
        case 'INITIALIZE_CART':
            console.log("Init cart");
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('m_cart')) || [];
        localStorage.setItem('cart', JSON.stringify(cartData));
        dispatch({ type: 'INITIALIZE_CART', payload: cartData });
    }, []);

    useEffect(() => {
        if (cart && cart.length > 0)
            localStorage.setItem('m_cart', JSON.stringify(cart));

    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};