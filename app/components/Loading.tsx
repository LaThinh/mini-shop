import React from "react";
import { IconLoading } from "../lib/icons";

function Loading({ text }: { text?: string }) {
	const loadingText = text || "Loading...";
	return (
		<div className="loading text-primary flex gap-2 items-center p-2 text-center text-lg">
			<IconLoading fill="#4c52c4" />

			{loadingText}
		</div>
	);
}

export default Loading;
