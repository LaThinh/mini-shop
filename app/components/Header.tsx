"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

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

	const handleCloseSearch = () => {
		setShowSearch(false);
		//setQuery("");
	};

	const handleSearch = (query: string) => {
		setQuery(query);
	};

	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			// Call your search function or perform other actions here
			console.log("Search term:", query);
			router.push(`/search?q=${query}`);
			// You can also use `router.push` for navigation
		}
	};

	return (
		<header className="header sticky top-0 z-50 shadow-md h-14 bg-white flex items-center">
			<div className="container m-auto max-w-5xl px-3 flex justify-between items-center">
				<div
					className={`container m-auto px-3 flex gap-3 items-center ${isSearchPage && "w-10"} ${
						showSearch && "hidden"
					}`}
				>
					{!showSearch && (
						<>
							<div className={`btn-back cursor-pointer ${pageRouter === "Home" && "hidden"}`} onClick={handleBack}>
								{query && query.length > 0 ? (
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M1.38461 18L0 16.6154L7.61538 9L0 1.38461L1.38461 0L9 7.61538L16.6154 0L18 1.38461L10.3846 9L18 16.6154L16.6154 18L9 10.3846L1.38461 18Z"
											fill="#666666"
										/>
									</svg>
								) : (
									<svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M7.30278 14.6056L0 7.30278L7.30278 0L8.61667 1.31389L3.54444 6.38611H22V8.21945H3.54444L8.61667 13.2917L7.30278 14.6056Z"
											fill="#666666"
										/>
									</svg>
								)}
							</div>

							{<h2 className="title text-lg font-medium text-nowrap">{query ? "" : pageTitle}</h2>}
						</>
					)}
				</div>

				<div className="right w-full flex gap-5 items-center">
					{showSearch && (
						<div className="search-bar flex gap-2 items-center w-full">
							<div className="close-search" onClick={handleCloseSearch}>
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M1.38461 18L0 16.6154L7.61538 9L0 1.38461L1.38461 0L9 7.61538L16.6154 0L18 1.38461L10.3846 9L18 16.6154L16.6154 18L9 10.3846L1.38461 18Z"
										fill="#666666"
									/>
								</svg>
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
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M20.6556 22L12.6195 13.9639C12.0084 14.4935 11.2954 14.906 10.4806 15.2014C9.66579 15.4968 8.80005 15.6444 7.88339 15.6444C5.68339 15.6444 3.8195 14.8806 2.29172 13.3528C0.763942 11.825 5.34058e-05 9.98148 5.34058e-05 7.82222C5.34058e-05 5.66296 0.763942 3.81944 2.29172 2.29167C3.8195 0.763889 5.6732 0 7.85283 0C10.0121 0 11.8505 0.763889 13.3681 2.29167C14.8857 3.81944 15.6445 5.66296 15.6445 7.82222C15.6445 8.69815 15.5019 9.54352 15.2167 10.3583C14.9315 11.1731 14.5038 11.937 13.9334 12.65L22.0001 20.6556L20.6556 22ZM7.85283 13.8111C9.50283 13.8111 10.9084 13.2255 12.0695 12.0542C13.2306 10.8829 13.8112 9.47222 13.8112 7.82222C13.8112 6.17222 13.2306 4.76157 12.0695 3.59028C10.9084 2.41898 9.50283 1.83333 7.85283 1.83333C6.18246 1.83333 4.76163 2.41898 3.59033 3.59028C2.41903 4.76157 1.83339 6.17222 1.83339 7.82222C1.83339 9.47222 2.41903 10.8829 3.59033 12.0542C4.76163 13.2255 6.18246 13.8111 7.85283 13.8111Z"
											fill="#666666"
										/>
									</svg>
								</div>
							)}
						</div>
					)}
					<div className="icon-share">
						<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16.8377 22C15.9686 22 15.2242 21.6929 14.6047 21.0788C13.9852 20.4646 13.6755 19.7267 13.6755 18.865C13.6755 18.7367 13.6893 18.5854 13.7171 18.4112C13.7448 18.2371 13.7864 18.0767 13.8419 17.93L5.43689 13.09C5.1595 13.4017 4.81738 13.6537 4.41054 13.8462C4.0037 14.0387 3.58761 14.135 3.16227 14.135C2.29311 14.135 1.54877 13.8279 0.929265 13.2137C0.309755 12.5996 0 11.8617 0 11C0 10.12 0.309755 9.3775 0.929265 8.7725C1.54877 8.1675 2.29311 7.865 3.16227 7.865C3.58761 7.865 3.99445 7.9475 4.3828 8.1125C4.77115 8.2775 5.12252 8.51583 5.43689 8.8275L13.8419 4.0425C13.7864 3.91417 13.7448 3.7675 13.7171 3.6025C13.6893 3.4375 13.6755 3.28167 13.6755 3.135C13.6755 2.255 13.9852 1.5125 14.6047 0.9075C15.2242 0.3025 15.9686 0 16.8377 0C17.7254 0 18.4743 0.3025 19.0846 0.9075C19.6949 1.5125 20 2.255 20 3.135C20 3.99667 19.6949 4.73458 19.0846 5.34875C18.4743 5.96292 17.7254 6.27 16.8377 6.27C16.4124 6.27 16.0009 6.20125 15.6033 6.06375C15.2057 5.92625 14.8682 5.70167 14.5908 5.39L6.18585 10.01C6.22284 10.1567 6.2552 10.3263 6.28294 10.5188C6.31068 10.7113 6.32455 10.8717 6.32455 11C6.32455 11.1283 6.31068 11.2658 6.28294 11.4125C6.2552 11.5592 6.22284 11.7058 6.18585 11.8525L14.5908 16.5825C14.8682 16.3258 15.1919 16.1196 15.5617 15.9638C15.9316 15.8079 16.3569 15.73 16.8377 15.73C17.7254 15.73 18.4743 16.0325 19.0846 16.6375C19.6949 17.2425 20 17.985 20 18.865C20 19.7267 19.6949 20.4646 19.0846 21.0788C18.4743 21.6929 17.7254 22 16.8377 22ZM16.8377 4.62C17.2631 4.62 17.619 4.47792 17.9057 4.19375C18.1923 3.90958 18.3356 3.55667 18.3356 3.135C18.3356 2.71333 18.1923 2.36042 17.9057 2.07625C17.619 1.79208 17.2631 1.65 16.8377 1.65C16.4124 1.65 16.0564 1.79208 15.7698 2.07625C15.4831 2.36042 15.3398 2.71333 15.3398 3.135C15.3398 3.55667 15.4831 3.90958 15.7698 4.19375C16.0564 4.47792 16.4124 4.62 16.8377 4.62ZM3.16227 12.485C3.58761 12.485 3.9436 12.3429 4.23024 12.0588C4.51687 11.7746 4.66019 11.4217 4.66019 11C4.66019 10.5783 4.51687 10.2254 4.23024 9.94125C3.9436 9.65708 3.58761 9.515 3.16227 9.515C2.73694 9.515 2.38095 9.65708 2.09431 9.94125C1.80767 10.2254 1.66436 10.5783 1.66436 11C1.66436 11.4217 1.80767 11.7746 2.09431 12.0588C2.38095 12.3429 2.73694 12.485 3.16227 12.485ZM16.8377 20.35C17.2631 20.35 17.619 20.2079 17.9057 19.9237C18.1923 19.6396 18.3356 19.2867 18.3356 18.865C18.3356 18.4433 18.1923 18.0904 17.9057 17.8062C17.619 17.5221 17.2631 17.38 16.8377 17.38C16.4124 17.38 16.0564 17.5221 15.7698 17.8062C15.4831 18.0904 15.3398 18.4433 15.3398 18.865C15.3398 19.2867 15.4831 19.6396 15.7698 19.9237C16.0564 20.2079 16.4124 20.35 16.8377 20.35Z"
								fill="#666666"
							/>
						</svg>
					</div>
				</div>
			</div>
		</header>
	);
}
