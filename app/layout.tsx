import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/CartContext";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Mini Shop App | Thinh La",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<CartProvider>
					<Header />
					<main className="main-content m-auto p-3 pb-24 min-h-[calc(100vh-80px)]">
						{children}
					</main>
				</CartProvider>
			</body>
		</html>
	);
}
