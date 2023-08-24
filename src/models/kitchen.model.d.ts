import { OrderRequestBody } from "./waiter.model"

export interface OrdersDto {
    orders: OrderRequestBody[]
    status: string
}

export interface OrdersStatusDto {
    id?: string
    category: string
    tag: string
}

export interface OrderStatusBody {
    status: string
}

export interface OrderExitDateBody {
    time: string
    exit_date: string
}