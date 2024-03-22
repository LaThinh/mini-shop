import React from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/app/lib/interface";

export default function ProductGrid({ products }: { products: IProduct[] }) {
	return (
		<div className="m-auto max-w-5xl product-grid grid gap-4 grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
