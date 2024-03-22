"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Header() {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<header className="header sticky top-0 z-50 shadow-md h-14 bg-white flex items-center">
			<div className="container m-auto px-3 flex justify-between items-center">
				<div className="flex gap-3 items-center">
					<a href="/category/2" className="btn-back" onClick={handleBack}>
						<svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M7.30278 14.6056L0 7.30278L7.30278 0L8.61667 1.31389L3.54444 6.38611H22V8.21945H3.54444L8.61667 13.2917L7.30278 14.6056Z"
								fill="#666666"
							/>
						</svg>
					</a>
					<h2 className="title text-lg font-medium">Real Food Store</h2>
				</div>
				<a href="/search" className="search">
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M20.6556 22L12.6195 13.9639C12.0084 14.4935 11.2954 14.906 10.4806 15.2014C9.66579 15.4968 8.80005 15.6444 7.88339 15.6444C5.68339 15.6444 3.8195 14.8806 2.29172 13.3528C0.763942 11.825 5.34058e-05 9.98148 5.34058e-05 7.82222C5.34058e-05 5.66296 0.763942 3.81944 2.29172 2.29167C3.8195 0.763889 5.6732 0 7.85283 0C10.0121 0 11.8505 0.763889 13.3681 2.29167C14.8857 3.81944 15.6445 5.66296 15.6445 7.82222C15.6445 8.69815 15.5019 9.54352 15.2167 10.3583C14.9315 11.1731 14.5038 11.937 13.9334 12.65L22.0001 20.6556L20.6556 22ZM7.85283 13.8111C9.50283 13.8111 10.9084 13.2255 12.0695 12.0542C13.2306 10.8829 13.8112 9.47222 13.8112 7.82222C13.8112 6.17222 13.2306 4.76157 12.0695 3.59028C10.9084 2.41898 9.50283 1.83333 7.85283 1.83333C6.18246 1.83333 4.76163 2.41898 3.59033 3.59028C2.41903 4.76157 1.83339 6.17222 1.83339 7.82222C1.83339 9.47222 2.41903 10.8829 3.59033 12.0542C4.76163 13.2255 6.18246 13.8111 7.85283 13.8111Z"
							fill="#666666"
						/>
					</svg>
				</a>
			</div>
		</header>
	);
}