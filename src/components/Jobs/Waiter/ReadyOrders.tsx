import { useState } from "react";
import { useQuery, } from "@tanstack/react-query";
import { Orders } from "./Orders";
import { SUCCESS } from "../../../constants/constants";
import { getOrdersByStatus } from "../../../api/kitchen";

export const ReadyOrders = () => {
    const [status] = useState(SUCCESS);
    const ordersByStatusQuery = useQuery(['orders', status], () => getOrdersByStatus(status));
    return (
        <div>
            <h5 className="px-2">Órdenes para entregar:</h5>
            {
                ordersByStatusQuery.isFetching ?
                    <p>Cargando...</p>
                    :
                    <Orders orders={ordersByStatusQuery.data} status={status} />
            }
        </div>
    )
}
