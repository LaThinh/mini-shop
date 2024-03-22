"use client";

import React, { useEffect, useState } from "react";
import { ICartItem, IProduct } from "@/app/lib/interface";
import { useCartContext } from "@/app/CartContext";

export default function AddToCart({ product }: { product: IProduct }) {
	const { cart, dispatch } = useCartContext();
	const [qty, setQty] = useState<number>(1);
	const [inCart, setInCart] = useState(false);
	const productId = product.id;
	const price = product.price;
	const cartItems: ICartItem[] = cart;

	useEffect(() => {
		const item = cartItems.filter((item) => item.productId === product.id);
		if (item && item.length > 0) {
			const cartQty: number = item[0].qty;
			setQty(cartQty);
			setInCart(true);
		}
	}, [cartItems, product.id, productId]);

	//console.log(cart);

	const handleAddToCart = (productId: string, qty: number) => {
		dispatch({ type: "ADD_TO_CART", payload: { productId, price, qty: qty || 1 } });
		setInCart(true);
	};

	const handleDecrease = () => {
		const preQty = qty;
		const newQty = Math.max(1, preQty - 1);
		setQty(newQty);
		//updateCartQty(product.id, newQty);
		handleAddToCart(product.id, newQty);
	};

	const handleIncrease = () => {
		const preQty = qty;
		const newQty = Math.min(100, preQty + 1);
		setQty(newQty);

		//updateCartQty(product.id, newQty);
		handleAddToCart(product.id, newQty);
	};

	const updateCartQty = (productId: string, qty: number) => {
		const product = {
			id: productId,
			quantity: qty,
		};
		console.log(product);
	};

	return (
		<div className="add-to-cart">
			{inCart ? (
				<div className="cart-qty flex items-center justify-between w-24">
					<a className="qty-change decrease text-xl" onClick={handleDecrease}>
						-
					</a>
					<input
						type="text"
						name="qty"
						className="qty w-9 text-lg text-center"
						value={qty}
						onChange={(event) => updateCartQty(product.id, Number.parseInt(event.target.value))}
					/>
					<a className="qty-change increase" onClick={handleIncrease}>
						+
					</a>
				</div>
			) : (
				<div className="hover:opacity-80">
					<a className="btn add-co-cart" onClick={() => handleAddToCart(productId, 1)}>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M6.02041 20C5.5102 20 5.07653 19.8248 4.71939 19.4743C4.36225 19.1239 4.18367 18.6984 4.18367 18.1977C4.18367 17.6971 4.36225 17.2716 4.71939 16.9212C5.07653 16.5707 5.5102 16.3955 6.02041 16.3955C6.53061 16.3955 6.96429 16.5707 7.32143 16.9212C7.67857 17.2716 7.85714 17.6971 7.85714 18.1977C7.85714 18.6984 7.67857 19.1239 7.32143 19.4743C6.96429 19.8248 6.53061 20 6.02041 20ZM16.2245 20C15.7143 20 15.2806 19.8248 14.9235 19.4743C14.5663 19.1239 14.3878 18.6984 14.3878 18.1977C14.3878 17.6971 14.5663 17.2716 14.9235 16.9212C15.2806 16.5707 15.7143 16.3955 16.2245 16.3955C16.7347 16.3955 17.1684 16.5707 17.5255 16.9212C17.8827 17.2716 18.0612 17.6971 18.0612 18.1977C18.0612 18.6984 17.8827 19.1239 17.5255 19.4743C17.1684 19.8248 16.7347 20 16.2245 20ZM3.92857 1.97747H18.9541C19.3452 1.97747 19.6429 2.15269 19.8469 2.50313C20.051 2.85357 20.051 3.20401 19.8469 3.55444L16.4031 9.63705C16.216 9.95411 15.9736 10.2086 15.676 10.4005C15.3784 10.5924 15.051 10.6884 14.6939 10.6884H6.96429L5.53571 13.2916H18.0612V14.7935H5.76531C5.05102 14.7935 4.53656 14.5599 4.22194 14.0926C3.90731 13.6254 3.91156 13.0997 4.23469 12.5156L5.86735 9.56195L1.9898 1.50188H0V0H2.98469L3.92857 1.97747Z"
								fill="#4C52C4"
							/>
						</svg>
					</a>
				</div>
			)}
		</div>
	);
}
