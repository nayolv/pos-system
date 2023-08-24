import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../api/admin";
import { GridColDef, esES } from "@mui/x-data-grid";
import { Table } from "../../Tables/Table";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { BasicModal } from "../../Modal/Modal";
import { useState } from "react";

interface RenderActionsEmployee {
    params: unknown
}

const role = {
    "waiter": "Mesero",
    "kitchen": "Chef",
    "admin": "Administrador"
}

const RenderActions: React.FC<RenderActionsEmployee> = ({ params }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='d-flex'>
            <IconButton onClick={() => handleOpen()}>
                <PreviewIcon />
            </IconButton>

            <IconButton>
                <DeleteIcon />
            </IconButton>

            <BasicModal open={open} handleClose={handleClose}>
                HOLO SOY EL MODAL
            </BasicModal>
        </div>
    )
}

export const Employees = () => {

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'Nombre', },
        { field: 'lastName', headerName: 'Apellido' },
        { field: 'role', headerName: 'Puesto', valueGetter: (params) => role[params.row.role as keyof typeof role] },
        { field: 'email', headerName: 'Email', },
        { field: 'action', headerName: 'Acción', renderCell: (params) => (<RenderActions params={params} />) }

    ];

    const usersQuery = useQuery(['users'], getUsers);

    return (
        <>
            {usersQuery.isLoading ?
                <p>Cargando</p>
                :
                <Table lenguage={esES.components.MuiDataGrid.defaultProps.localeText} columns={columns} rows={usersQuery.data} />
            }
        </>

    )
}
