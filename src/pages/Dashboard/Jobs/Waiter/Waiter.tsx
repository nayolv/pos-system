import { useState } from "react";
import { Menu } from "./components/Menu"
import { Ticket } from "./components/Ticket"
import { OrderDto } from "../../../../models/waiter.model";
import './waiter.scss'


export const Waiter = () => {
    const [orders, setOrders] = useState<OrderDto[]>([]);

    return (
        <div className="waiter-container d-flex">
            <Menu setOrders={setOrders} orders={orders} />
            <Ticket setOrders={setOrders} orders={orders} />
        </div>
    )
}
