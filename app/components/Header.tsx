"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IconBack, IconClose, IconSearch, IconShare } from "../lib/icons";

export default function Header() {
	const router = useRouter();

	const pathname = usePathname();
	const isSearchPage = pathname.indexOf("search") >= 0;
	const [showSearch, setShowSearch] = useState(false);
	const [query, setQuery] = useState("");

	let pageTitle = "Homepage";
	let pageRouter = "";
	if (pathname === "/") {
		pageRouter = "Home";
	}
	if (pathname.indexOf("category") >= 0) {
		pageTitle = "Real Food Store";
		pageRouter = "Catalog";
	} else if (pathname.indexOf("product") >= 0) {
		pageTitle = "Product Detail Page";
		pageRouter = "Product";
	} else if (pathname.indexOf("search") >= 0) {
		pageTitle = "Search Page";
		pageRouter = "Search";
	} else if (pathname.indexOf("cart") >= 0) {
		pageTitle = "Cart page";
		pageRouter = "Cart";
	}

	const handleBack = () => {
		setShowSearch(false);
		setQuery("");
		router.back();
		if (pageRouter === "Search") router.back();
	};

	const handleShowSearch = () => {
		setShowSearch(!showSearch);
		if (!isSearchPage) {
			router.push("/search");
		}
	};

	const handleSearch = (query: string) => {
		setQuery(query);
	};

	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			// Call your search function or perform other actions here
			// console.log("Search term:", query);
			// You can also use `router.push` for navigation
			router.push(`/search?q=${query}`);
		}
	};

	return (
		<header className="header sticky top-0 z-50 shadow-md h-14 bg-white flex items-center">
			<div className="container m-auto max-w-5xl px-3 flex justify-between items-center">
				<div
					className={`header-left m-auto px-3 flex gap-3 items-center ${
						isSearchPage && "w-10"
					} ${showSearch && "hidden"}`}
				>
					{!showSearch && (
						<>
							<div
								className={`btn-back cursor-pointer ${pageRouter === "Home" && "hidden"}`}
								onClick={handleBack}
							>
								{/* {query && query.length > 0 ? <IconClose /> : <IconBack />} */}
								<IconBack />
							</div>

							{
								<h2 className="title text-lg font-medium text-nowrap">
									{query ? "" : pageTitle}
								</h2>
							}
						</>
					)}
				</div>

				<div className="header-right w-full flex gap-5 items-center">
					{showSearch && (
						<div className="search-bar flex gap-2 items-center w-full">
							<div className="close-search" onClick={() => setShowSearch(false)}>
								<IconClose />
							</div>
							<input
								id="search"
								defaultValue={query}
								placeholder="Enter keyword to search"
								className="search m-auto w-full border rounded-lg bg-white border-gray-300 px-3 py-2"
								onChange={(event) => handleSearch(event.target.value)}
								onKeyDown={handleKeyDown}
							/>
						</div>
					)}
					{!showSearch && (
						<div className="w-full flex gap-3 items-center justify-between">
							<div>
								{/* <h2 className="title text-lg font-medium">Real Food Store</h2> */}
								{isSearchPage && <h2 className="title text-lg font-medium">{query}</h2>}
							</div>
							{!query && (
								<div className="icon-search" onClick={handleShowSearch}>
									<IconSearch />
								</div>
							)}
						</div>
					)}
					<div className="icon-share">
						<IconShare />
					</div>
				</div>
			</div>
		</header>
	);
}
