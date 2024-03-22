export interface IProduct {
	id: string;
	title: string;
	image: string;
	price: number;
	categories: string[];
	SKU?: string;
	unit?: string;
	inventory?: number;
}

export interface ICart {
	cartItems: ICartItem[];
	totalPrice?: number;
}

export interface ICartItem {
	productId: string;
	price: number;
	qty: number;
}
