import { OrderRequestBody } from "../models/waiter.model";
import { baseUrl } from "./base";

export const getProductsByCategory = async(category: string) => {
    const res = await fetch(`${baseUrl}products?tag=${category}`);
    const products = await res.json();
    return products;
}

export const getCategories = async() => {
    const res = await fetch(`${baseUrl}categories`);
    const categories = await res.json();
    return categories;
}

export const postOrder = async (body: OrderRequestBody) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    const response = await fetch(`${baseUrl}orders`, requestOptions);
    const data = await response.json();
    return data
}