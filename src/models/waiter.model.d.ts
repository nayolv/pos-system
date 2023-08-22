import { OrderDto } from "./waiter.model";
import { CategoryDto, ProductDto } from "./products.model";

export interface MenuDto {
    orders: OrderDto[]
    setOrders: Dispatch<SetStateAction<OrderDto[]>>
}

export interface FormatDateDto {
    hour: string
    date: string
}

export interface ProductDto {
    id: string
    name: string
    price: string
    image: string
    category: string
    dataEntry: string
    quantitity: string
}

export interface CategoryDto {
    id: string
    category: string
    tag: string
}

export interface OrderDto {
    id: string
    product: string
    price: string
    quantity: string
}

export interface TicketDto {
    orders: OrderDto[]
    setOrders: Dispatch<SetStateAction<OrderDto[]>>
}

export type OrderStatus = 'pending' | 'in_progress' | 'cancel' | 'success' | 'delivered';

export interface OrderRequestBody {
    id?: string,
    table: string,
    products: OrderDto[]
    entry_hour: string
    exit_hour?: string
    date: string
    time?: string
    status: OrderStatus
}

export interface WaiterTableDto {
    rows: OrderDto[]
    setOrders: Dispatch<SetStateAction<OrderDto[]>>
    formattedTime: string
    table: string
    setTable: Dispatch<SetStateAction<string>>
}

export interface WaiterActionsTable {
    params: unknow
    setOrders: Dispatch<SetStateAction<OrderDto[]>>
    orders: OrderDto[]
}

export interface HeaderTableDto {
    table: string
    setTable: Dispatch<SetStateAction<string>>
    formattedTime: string
}
