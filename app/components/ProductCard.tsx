import React, { Suspense } from "react";
import { IProduct } from "@/app/lib/interface";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

// import dynamic from "next/dynamic";
// import Loading from "./Loading";
// const AddToCart = dynamic(() => import("@/app/components/AddToCart"), {
// 	ssr: false,
// });

export default function ProductCard({ product }: { product: IProduct }) {
	return (
		<div className="product-card bg-white rounded-lg shadow-md overflow-hidden">
			<div className="flex flex-col">
				<div className="product-image aspect-square overflow-hidden">
					<Link href={`/product/${product.id}`}>
						<Image
							width="320"
							height="320"
							className="transition-transform duration-300 hover:scale-105"
							src={product.image}
							alt={product.title}
						/>
					</Link>
				</div>
				<div className="product-info p-3 flex flex-col gap-2">
					<Link href={`/product/${product.id}`}>
						<h3 className="product-title font-medium text-sm">{product.title}</h3>
					</Link>
					<div className="price text-xs">₹ {product.price}</div>
					{/* <Suspense fallback={<Loading />}>
					</Suspense> */}
					<AddToCart product={product} />
				</div>
			</div>
		</div>
	);
}
