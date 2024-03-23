"use client";

import React, { Suspense, useEffect, useState } from "react";
import { ICartItem, IProduct } from "@/app/lib/interface";
import { useCartContext } from "@/app/CartContext";
import Loading from "./Loading";
import { IconCart } from "@/app/lib/icons";

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

	const handleAddToCart = (productId: string, qty: number) => {
		dispatch({ type: "ADD_TO_CART", payload: { productId, price, qty: qty || 1 } });
		setInCart(true);
	};

	const handleRemoveFromCart = (productId: string) => {
		dispatch({ type: "REMOVE_ITEM", payload: { productId } });
	};

	const handleDecrease = () => {
		const preQty = qty;
		const newQty = Math.max(1, preQty - 1);
		setQty(newQty);
		handleAddToCart(product.id, newQty);
	};

	const handleIncrease = () => {
		const preQty = qty;
		const newQty = Math.min(100, preQty + 1);
		setQty(newQty);

		//updateCartQty(product.id, newQty);
		handleAddToCart(product.id, newQty);
	};

	const handleKeyDown = (event: any) => {
		const newQty = Number.parseInt(event.target.value);
		if (newQty) {
			updateCartQty(product.id, newQty);
		}
	};

	const updateCartQty = (productId: string, qty: number) => {
		const product = {
			id: productId,
			quantity: qty,
		};
		dispatch({ type: "UPDATE_QUANTITY", payload: { productId, qty: qty || 1 } });
	};

	return (
		<div className="add-to-cart min-h-7">
			<Suspense fallback={<Loading />}>
				{inCart ? (
					<div className="cart-qty flex items-center justify-between w-24">
						<a
							className={`qty-change decrease text-xl ${qty === 1 ? "disabled" : ""}`}
							onClick={handleDecrease}
						>
							-
						</a>
						<input
							type="text"
							name="qty"
							className="qty w-9 text-lg text-center"
							value={qty}
							// onChange={(event) => updateCartQty(product.id, Number.parseInt(event.target.value))}
							onChange={(event) => setQty(Number.parseInt(event.target.value))}
							onKeyDown={handleKeyDown}
							onBlur={(e) => updateCartQty(product.id, Number.parseInt(e.target.value))}
						/>
						<a className="qty-change increase" onClick={handleIncrease}>
							+
						</a>
					</div>
				) : (
					<div className="hover:opacity-90">
						<button
							className="btn add-to-cart cursor-pointer"
							onClick={() => handleAddToCart(productId, 1)}
						>
							<IconCart size={20} />
						</button>
					</div>
				)}
			</Suspense>
		</div>
	);
}
