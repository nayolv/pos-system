
import { IconButton, Paper, Tooltip } from "@mui/material";
import AcceptIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/CancelRounded';
import DoneIcon from '@mui/icons-material/SendRounded';
import { OrdersDto } from "../../../../models/kitchen.model";
import { patchOrderStatus } from "../../../../api/kitchen";
import { CANCEL, IN_PROGRESS, PENDING, SUCCESS } from "../../../../constants/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const Orders: React.FC<OrdersDto> = ({ orders, status }) => {
    const queryClient = useQueryClient();
    const [orderIdToUpdate, setOrderIdToUpdate] = useState<string | undefined>();

    const mutation = useMutation((newStatus: string) => patchOrderStatus({ status: newStatus }, orderIdToUpdate), {
        onSuccess: () => {
            const statusQueryKey = ['status'];
            const ordersByStatusQueryKey = ['orders', status];
            queryClient.invalidateQueries(statusQueryKey);
            queryClient.invalidateQueries(ordersByStatusQueryKey);
            setOrderIdToUpdate(undefined);
        },
    });

    const acceptIconCondition = (status: string) => status === IN_PROGRESS || status === SUCCESS || status === CANCEL;
    const sendIconCondition = (status: string) => status === PENDING || status === SUCCESS || status === CANCEL;
    const cancelIconCondition = (status: string) => status === CANCEL || status === SUCCESS;

    return (
        <div className="d-flex flex-wrap">
            {
                orders.map(({ id, date, entry_hour, table, products, status }, i) => (
                    <Paper key={i} className="order-card d-flex flex-column justify-content-between" elevation={2}>
                        <div className="order-card__header">
                            <div className="d-flex justify-content-between align-items-center">
                                <p>Orden #{id}</p>
                                <p>Mesa: {table}</p>
                            </div>
                            <span>{date}, {entry_hour}</span>
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
                            <hr className={`${status}-color`} />
                            <div className="d-flex justify-content-between action-icons">
                                <Tooltip title="Aceptar orden">
                                    <span>
                                        <IconButton
                                            disabled={acceptIconCondition(status)}
                                            aria-label="accept"
                                            onClick={() => {
                                                // UpdateOrderStatus({ status: IN_PROGRESS }, id)
                                                setOrderIdToUpdate(id);
                                                mutation.mutate(IN_PROGRESS);
                                            }}>
                                            <AcceptIcon className="action-icons__accept" style={{
                                                color: acceptIconCondition(status) ? "#C7C7C7" : ""
                                            }} />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Cancelar orden">
                                    <span>
                                        <IconButton
                                            disabled={cancelIconCondition(status)}
                                            aria-label="cancel"
                                            onClick={() => {
                                                // UpdateOrderStatus({ status: CANCEL }, id)
                                                setOrderIdToUpdate(id);
                                                mutation.mutate(CANCEL);
                                            }}>
                                            <CancelIcon className="action-icons__cancel" style={{
                                                color: cancelIconCondition(status) ? "#C7C7C7" : ""
                                            }} />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Enviar orden">
                                    <span>
                                        <IconButton
                                            disabled={sendIconCondition(status)}
                                            aria-label="send"
                                            onClick={() => {
                                                // UpdateOrderStatus({ status: SUCCESS }, id)
                                                setOrderIdToUpdate(id);
                                                mutation.mutate(SUCCESS);
                                            }}>
                                            <DoneIcon className="action-icons__send" style={{
                                                color: sendIconCondition(status) ? "#C7C7C7" : ""
                                            }} />
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

export default Orders;