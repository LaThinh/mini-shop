import React from "react";
import ProductGrid from "@/app/components/ProductGrid";
import CartBar from "@/app/components/CartBar";
import data from "@/app/data/product.json";
import { IProduct } from "@/app/lib/interface";

export default function ProductCategory() {
	const products: IProduct[] = data;
	return (
		<div className="m-auto p-3 product-category container">
			<h1 className="page-title text-center">Product Category</h1>
			<ProductGrid products={products} />
			<CartBar />
		</div>
	);
}
