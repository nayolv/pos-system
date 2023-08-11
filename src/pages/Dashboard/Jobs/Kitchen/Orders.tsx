import { useEffect, useState } from "react";
import { getOrders } from "../../../../api/kitchen";
import { OrderRequestBody, OrderStatus } from "../../../../models/waiter.model";
import { Button, Paper } from "@mui/material";
import TableBarIcon from '@mui/icons-material/TableBar'; import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PendingIcon from '@mui/icons-material/Pending';
import InProgressIcon from '@mui/icons-material/AutoMode';
import SuccessIcon from '@mui/icons-material/CheckCircle';


const statusIcon: Record<OrderStatus, React.ReactNode> = {
    pending: <PendingIcon />,
    progress: <InProgressIcon />,
    success: <SuccessIcon />
}

const Orders = () => {
    const [orders, setOrders] = useState<OrderRequestBody[]>([]);

    const GetOrders = async () => {
        try {
            const dataOrders = await getOrders();
            console.log(dataOrders);

            setOrders(dataOrders);

        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        GetOrders();
    }, [])

    return (
        <>
            {
                orders.map(({ id, date, entry_hour, table, status, products }) => (
                    <Paper className="order-card d-flex" key={id} elevation={1}>
                        Orden
                        <div>
                            <p><CalendarMonthIcon /> {date}</p>
                            <p><QueryBuilderRoundedIcon /> {entry_hour}</p>
                            <p >{statusIcon[status]} {status}</p>
                            <p><TableBarIcon /> {table}</p>
                        </div>
                        <div>
                            <ul>
                                {
                                    products.map((product) => (
                                        <li>
                                            {product.product}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <Button >Ingresar</Button>
                    </Paper>
                ))
            }
        </>
    )
}

export default Orders;