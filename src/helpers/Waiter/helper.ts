import { OrderDto, OrderRequestBody } from "../../models/waiter.model";

export const handleAddProduct = (id: string, name: string, price: string, orders: OrderDto[], setOrders: React.Dispatch<React.SetStateAction<OrderDto[]>>): void => {
    const existingProduct = orders.find((item) => item.id === id);

    if (existingProduct) {
        setOrders((prevOrder: OrderDto[]) =>
            prevOrder.map((item) =>
                item.id === id ? { ...item, quantity: (parseInt(item.quantity) + 1).toString() } : item
            )
        );
        return
    }

    const newOrderItem: OrderDto = {
        id: id,
        product: name,
        price: price,
        quantity: "1"
    };
    setOrders((prevOrder: OrderDto[]) => [...prevOrder, newOrderItem]);
};


// export const formatDate = (formattedTime: string): FormatDateDto => {
//     const dayAndHour = formattedTime.split(", ");
//     return {
//         date: dayAndHour[0],
//         hour: dayAndHour[1]
//     }
// }

export const orderBody = (table: string, orders: OrderDto[], formattedTime: string): OrderRequestBody => {
    return {
        table,
        products: orders,
        entry_date: formattedTime,
        exit_date: '',
        time: '',
        status: 'pending'
    }
}