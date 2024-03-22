import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Link href="/category/2" title="Category" className="text-primary text-xl">
				<h3 className="font-bold">Go to Product Category</h3>
			</Link>
		</main>
	);
}
