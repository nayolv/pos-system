import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { updateOrderStatus } from "../../../api/kitchen";
import { OrdersDto } from "../../../models/kitchen.model";
import { DELIVERED } from "../../../constants/constants";
import AcceptIcon from '@mui/icons-material/CheckCircleRounded';

export const Orders: React.FC<OrdersDto> = ({ orders, status }) => {
    const [orderIdToUpdate, setOrderIdToUpdate] = useState<string>();
    const queryClient = useQueryClient();

    const mutation = useMutation((newStatus: string) => updateOrderStatus({ status: newStatus }, orderIdToUpdate), {
        onSuccess: () => {
            const statusQueryKey = ['status'];
            const ordersByStatusQueryKey = ['orders', status];
            queryClient.invalidateQueries(statusQueryKey);
            queryClient.invalidateQueries(ordersByStatusQueryKey);
            setOrderIdToUpdate(undefined);
        },
    });

    return (
        <div className="d-flex flex-wrap ready-orders-container">
            {
                orders?.map(({ id, entry_date, table, products, status }, i) => (
                    <Paper key={i} className="order-card d-flex flex-column justify-content-between" elevation={2}>
                        <div className="order-card__header">
                            <div className="d-flex justify-content-between align-items-center">
                                <p>Orden #{id}</p>
                                <p>Mesa: {table}</p>
                            </div>
                            <span>{entry_date}</span>
                            <hr className={`${status}-color`} />
                        </div>

                        <div className="order-card__body">
                            <ul>
                                {
                                    products.map((product) => (
                                        <li key={product.id}>
                                            <strong> {product.quantity}</strong> {product.product}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="order-card__actions ">
                            <div className="d-flex justify-content-end action-icons">
                                <Tooltip title="Entregar orden">
                                    <span>
                                        <IconButton
                                            aria-label="delivered"
                                            onClick={() => {
                                                setOrderIdToUpdate(id);
                                                mutation.mutate(DELIVERED);
                                            }}>
                                            <AcceptIcon className="action-icons__accept" />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </Paper >
                ))
            }
        </div>
    )
}
