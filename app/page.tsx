import Link from "next/link";
import data from "@/app/data/product.json";
import { IProduct } from "@/app/lib/interface";
import ProductGrid from "./components/ProductGrid";
import CartBar from "./components/CartBar";

export default function Home() {
	const products: IProduct[] = data;

	return (
		<main className="w-full m-auto flex min-h-screen flex-col gap-5 items-center justify-between">
			<h1 className="page-title">Welcome to Homepage</h1>
			<Link href="/category/2" title="Category" className="text-primary text-xl">
				<h2 className="font-bold">Go to Product Category</h2>
			</Link>
			<ProductGrid products={products} />
			<CartBar />
		</main>
	);
}
