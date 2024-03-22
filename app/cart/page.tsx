"use client";
import React from "react";
import { useCartContext } from "@/app/CartContext";
import { ICartItem, IProduct } from "../lib/interface";
import data from "@/app/data/product.json";
import Image from "next/image";

export default function CartPage() {
	const { cart } = useCartContext();
	const products: IProduct[] = data;

	//const productCart = products.filter(product => product.id)
	const cartProducts: IProduct[] = []; //products.filter((product) => cart.some((item: ICartItem) => item.productId === product.id));

	let totalQty = 0;
	let totalPrice = 0;

	cart.forEach((item: ICartItem) => {
		totalQty += item.qty;
		totalPrice += item.qty * item.price;

		const product = products.filter((product) => product.id === item.productId);
		if (product && product.length > 0) {
			cartProducts.push(product[0]);
		}
	});

	console.log(cartProducts);
	console.log(cart);

	const cartData: ICartItem[] = cart;

	return (
		<div className="container m-auto">
			<h1 className="page-title text-center">Cart Page</h1>

			{cartProducts && cartProducts.length > 0 && (
				<>
					<table className="cart-products m-auto max-w-4xl table-auto border-separate p-8">
						<thead className="font-bold p-2">
							<tr>
								<td></td>
								<td>Title</td>
								<td>Price</td>
								<td>Quantity</td>
								<td>Total</td>
							</tr>
						</thead>
						<tbody>
							{cartProducts.map((product) => {
								const cartItem = cartData.filter((item) => item.productId === product.id);
								return (
									<tr key={product.id} className="cart-item p-2">
										<td className="product-image">
											<Image src={product.image} width={120} height={120} alt={product.title} />
										</td>
										<td className="product-name  ">
											<div className="product-id w-full text-sm text-gray-500">Id: {product.id}</div>
											<h3>{product.title}</h3>
										</td>
										<td className="product-price">{product.price}</td>
										<td className="product-qty">{cartItem[0].qty}</td>
										<td className="product-total text-right">{cartItem[0].qty * product.price}</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot>
							<tr>
								<td colSpan={3} className="text-right font-bold">
									Totals
								</td>
								<td className="text-xl font-bold">{totalQty}</td>
								<td className="text-xl font-bold text-right">{totalPrice.toFixed(2)}</td>
							</tr>
						</tfoot>
					</table>

					<div className="actions m-auto mb-20 max-w-xl flex justify-between">
						<span></span>
						<a
							href=""
							className="btn-checkout mt-10 bg-primary hover:opacity-90 text-white text-2xl px-10 py-2 rounded-full"
						>
							Checkout
						</a>
					</div>
				</>
			)}
		</div>
	);
}
