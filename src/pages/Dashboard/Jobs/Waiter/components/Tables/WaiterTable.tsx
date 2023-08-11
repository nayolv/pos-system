import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { OrderDto, WaiterActionsTable, WaiterTableDto } from '../../../../../../models/waiter.model';
import { HeaderTable } from './HeaderTable';

const RenderActions: React.FC<WaiterActionsTable> = ({ params, setOrders }) => {

    const increaseQuantity = () => {
        setOrders((prevOrder: OrderDto[]) =>
            prevOrder.map((item) =>
                item.id === params.row.id ? { ...item, quantity: (parseInt(item.quantity) + 1).toString() } : item
            )
        );
    };

    const decreaseQuantity = () => {
        setOrders((prevOrder: OrderDto[]) =>
            prevOrder.map((item) =>
                item.id === params.row.id
                    ? parseInt(item.quantity) > 0
                        ? { ...item, quantity: (parseInt(item.quantity) - 1).toString() }
                        : null
                    : item
            ).filter(Boolean)
        );
    };

    const removeProduct = () => {
        setOrders((prevOrder: OrderDto[]) =>
            prevOrder.filter((item) => item.id !== params.row.id)
        )
    };

    return (
        <div className='d-flex'>
            <IconButton onClick={() => increaseQuantity()}>
                <AddOutlinedIcon />
            </IconButton>

            <IconButton onClick={() => decreaseQuantity()}>
                <RemoveOutlinedIcon />
            </IconButton>

            <IconButton onClick={() => removeProduct()}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </div>
    )
}

export const WaiterTable: React.FC<WaiterTableDto> = ({ rows, setOrders, formattedTime, table, setTable }) => {
    const columns: GridColDef[] = [
        { field: 'product', headerName: 'Producto', },
        { field: 'price', headerName: 'Precio', valueGetter: (params) => { return `$${params.row.price}` } },
        { field: 'quantity', headerName: 'Cantidad', },
        { field: 'action', headerName: 'Acción', renderCell: (params) => (<RenderActions params={params} setOrders={setOrders} orders={rows} />), width: 130 }
    ];

    return (
        <div className='waiter-table'>
            <HeaderTable formattedTime={formattedTime} table={table} setTable={setTable} />
            <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}