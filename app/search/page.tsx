"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import data from "@/app/data/product.json";
import { IProduct } from "@/app/lib/interface";
import ProductGrid from "../components/ProductGrid";

function Search() {
	const searchParams = useSearchParams();
	const query = searchParams.get("q");
	const products: IProduct[] = data;

	let pSearch: IProduct[] = [];
	if (query) {
		pSearch = products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
	}

	return (
		<div className="container px-3">
			{query && query.length > 0 ? (
				<div className="result">
					{pSearch && pSearch.length > 0 ? <ProductGrid products={pSearch} /> : <p>Not found</p>}
				</div>
			) : (
				<p className="text-center">Please Enter keyword to search</p>
			)}
		</div>
	);
}

export default function SearchPage() {
	return (
		<div className="container px-3">
			<h1 className="page-title">Search</h1>
			<Suspense>
				<Search />
			</Suspense>
		</div>
	);
}
