"use client";
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ICart } from '@/app/lib/interface';

const CartContext = createContext();


const cartReducer = (state, action) => {
    console.log(state);
    switch (action.type) {
        case 'ADD_TO_CART':
            console.log("Add Cart");
            console.log(action.payload);

            //const updatedCart = [...state];
            const existingItemIndex = state.findIndex(item => item.productId === action.payload.productId);
            if (existingItemIndex !== -1) {

                const updatedCart = [...state];
                //const cartItem = updatedCart[existingItemIndex];

                updatedCart[existingItemIndex].qty = action.payload.qty;
                return updatedCart;
            } else {
                return [...state, action.payload];
            }

        case 'INITIALIZE_CART':
            console.log("Init cart");
            //console.log(state);
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
        console.log("Cart Data: " + cartData);

        localStorage.setItem('cart', JSON.stringify(cartData));

        dispatch({ type: 'INITIALIZE_CART', payload: cartData });
    }, []);

    useEffect(() => {
        console.log(cart);
        if (cart && cart.length > 0)
            localStorage.setItem('m_cart', JSON.stringify(cart));

    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};