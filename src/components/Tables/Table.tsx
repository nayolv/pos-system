import { DataGrid, GridColDef, GridLocaleText } from '@mui/x-data-grid'

interface TableDto {
    lenguage: Partial<GridLocaleText>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any
    columns: GridColDef[]
}

export const Table: React.FC<TableDto> = ({ lenguage, rows, columns }) => {
    return (
        <DataGrid
            localeText={lenguage}
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
        />
    )
}
