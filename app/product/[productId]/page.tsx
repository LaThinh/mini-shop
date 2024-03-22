import React from "react";
import data from "@/app/data/product.json";
import { IProduct } from "@/app/lib/interface";
import Image from "next/image";
import AddToCart from "@/app/components/AddToCart";
import CartBar from "@/app/components/CartBar";

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
	const productId = params.productId;
	const products: IProduct[] = data;
	const product = products.find((p) => p.id === productId);
	if (!product) {
		return <div>Not found product</div>;
	}
	return (
		<div className="product-detail container m-auto max-w-5xl p-3 flex flex-col items-center md:flex-row md:items-start gap-5">
			<div className="product-image text-center">
				<Image src={product.image.replace("300", "540")} width={500} height={500} alt={product.title} />
			</div>
			<div className="product-info flex flex-col gap-6">
				<h1 className="product-title page-title">{product.title}</h1>
				<h3 className="text-xl font-medium">
					Price: <span className="text-primary">₹ {product.price}</span>
				</h3>
				<AddToCart product={product} />
			</div>

			<CartBar />
		</div>
	);
}
