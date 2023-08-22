import { OrderStatusBody, OrdersStatusDto } from "../models/kitchen.model";
import { baseUrl } from "./base";

export const getOrdersStatus = async (): Promise<OrdersStatusDto[]> => {
    const res = await fetch(`${baseUrl}orders_status`);
    const ordersStatus = await res.json();
    return ordersStatus;
}

export const getOrdersByStatus = async (status: string) => {
    const res = await fetch(`${baseUrl}orders?status=${status}`);
    const products = await res.json();
    return products;
}

export const updateOrderStatus = async (body: OrderStatusBody, id: string | undefined) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    const response = await fetch(`${baseUrl}orders/${id}`, requestOptions);
    const data = await response.json();
    return data;
}