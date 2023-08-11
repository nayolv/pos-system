import { baseUrl } from "./base";

export const getOrders = async() => {
    const res = await fetch(`${baseUrl}orders`);
    const orders = await res.json();
    return orders;
}