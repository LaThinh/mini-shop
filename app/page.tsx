import Link from "next/link";
import data from "@/app/data/product.json";
import { IProduct } from "@/app/lib/interface";
import ProductGrid from "./components/ProductGrid";
import CartBar from "./components/CartBar";

export default function Home() {
	const products: IProduct[] = data;

	return (
		<main className="w-full m-auto flex min-h-screen flex-col gap-5 items-center justify-between p-3">
			<h1 className="page-title">Welcome to Homepage</h1>
			<Link href="/category/2" title="Category" className="text-primary text-xl">
				<h3 className="font-bold">Go to Product Category</h3>
			</Link>
			<ProductGrid products={products} />
			<CartBar />
		</main>
	);
}
