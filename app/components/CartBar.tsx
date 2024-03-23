"use client";

import React, { useEffect } from "react";
import { useCartContext } from "@/app/CartContext";
import { ICartItem } from "../lib/interface";
import Link from "next/link";

export default function CartBar() {
	const { cart } = useCartContext();
	let totalQty = 0;
	let totalPrice = 0;

	cart.forEach((item: ICartItem) => {
		totalQty += item.qty;
		totalPrice += item.qty * item.price;
	});
	return (
		<div className="cart-bar container m-auto w-[calc(100%-16px)] max-w-5xl fixed left-1/2 translate-x-[-50%] bottom-3 bg-primary text-white p-3 rounded-lg">
			<div className="container flex justify-between items-center min-h-9">
				<div className="cart-qty flex items-center gap-3">
					<div className="total-qty bg-[#00E5C9] w-8 h-8 flex items-center justify-center text-white rounded-full text-center">
						{totalQty}
					</div>
					<span>In your cart</span>
				</div>
				<div className="cart-price ">
					<Link
						href="/cart"
						title="Go to Cart Page"
						className="flex gap-3 !text-white not-change items-center transition hover:scale-105"
					>
						<div className="total-price font-bold">₹ {totalPrice.toFixed(2)}</div>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5.90845 13L5 12.1079L9.1831 8L5 3.89212L5.90845 3L11 8L5.90845 13Z"
								fill="white"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
}
