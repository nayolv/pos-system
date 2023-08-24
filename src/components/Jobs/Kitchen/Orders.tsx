import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { OrderExitDateBody, OrdersDto } from "../../../models/kitchen.model";
import { useCurrentTime } from "../../../hooks/useCurrentTime";
import { CANCEL, IN_PROGRESS, SUCCESS } from "../../../constants/constants";
import { acceptIconCondition, calculateDateDifference, cancelIconCondition, sendIconCondition } from "../../../helpers/Kitchen/helper";
import { updateOrderExitDateAndTime, updateOrderStatus } from "../../../api/kitchen";
import AcceptIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/CancelRounded';
import DoneIcon from '@mui/icons-material/SendRounded';

const Orders: React.FC<OrdersDto> = ({ orders, status }) => {
    const [orderIdToUpdate, setOrderIdToUpdate] = useState<string | undefined>();
    const { formattedTime } = useCurrentTime();
    const queryClient = useQueryClient();

    const updateStatus = useMutation((newStatus: string) => updateOrderStatus({ status: newStatus }, orderIdToUpdate), {
        onSuccess: () => {
            const statusQueryKey = ['status'];
            const ordersByStatusQueryKey = ['orders', status];
            queryClient.invalidateQueries(statusQueryKey);
            queryClient.invalidateQueries(ordersByStatusQueryKey);
            setOrderIdToUpdate(undefined);
        }
    });

    const updateDateAndTime = useMutation((updatedProperties: OrderExitDateBody) =>
        updateOrderExitDateAndTime(updatedProperties, orderIdToUpdate), {
        onSuccess: () => {
            updateStatus.mutate(SUCCESS);
            queryClient.invalidateQueries(['orders']);
        },
        onError: (error) => {
            console.warn(error)
        }
    });

    const handleModifyOrder = async (time: string, exitDate: string) => {
        await updateDateAndTime.mutateAsync({
            time: time,
            exit_date: exitDate,
        });
    };

    return (
        <div className="d-flex flex-wrap">
            {
                orders?.map(({ id, entry_date, table, products, status, time = 0 }, i) => (
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
                                {products?.map((product) => (
                                    <li key={product.id}>
                                        <strong> {product.quantity}</strong> {product.product}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="order-card__actions ">
                            <hr className={`${status}-color`} />
                            {status === SUCCESS && time !== "NaN" &&
                                <p>Tiempo en cocina: <strong>{Math.round(Number(time))}</strong> min.</p>
                            }
                            <div className="d-flex justify-content-between action-icons">
                                <Tooltip title="Aceptar orden">
                                    <span>
                                        <IconButton
                                            disabled={acceptIconCondition(status)}
                                            aria-label="accept"
                                            onClick={() => {
                                                setOrderIdToUpdate(id);
                                                updateStatus.mutate(IN_PROGRESS);
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
                                                setOrderIdToUpdate(id);
                                                updateStatus.mutate(CANCEL);
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
                                                setOrderIdToUpdate(id);
                                                handleModifyOrder(calculateDateDifference(formattedTime, entry_date), formattedTime)
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