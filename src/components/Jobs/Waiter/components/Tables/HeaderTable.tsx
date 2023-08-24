/* eslint-disable @typescript-eslint/no-explicit-any */
import TableRestaurantRoundedIcon from '@mui/icons-material/TableRestaurantRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import { HeaderTableDto } from '../../../../../models/waiter.model';
import { debounce } from '../../../../../helpers/debounce';


export const HeaderTable: React.FC<HeaderTableDto> = ({ formattedTime, table, setTable }) => {
    const handleInputChange = debounce((value: string) => {
        const parseValue = parseInt(value);
        if (value === '') return setTable('1');
        if (parseValue > 30) return setTable('30');
        if (parseValue === 0) return setTable('1');
    }, 500);

    const handleChangeTable = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleInputChange(value);
        setTable(value);
    }

    return (
        <div className='d-flex justify-content-around align-items-center header-table'>

            <p className='d-flex align-items-center'>
                <TableRestaurantRoundedIcon className='icon-table' />
                <input className='input-num-table' value={table} type="number" min={1} max={30} onChange={(e) => handleChangeTable(e)} />
            </p>
            <p className='d-flex align-items-center text-time'><QueryBuilderRoundedIcon className='icon-table' />
                {formattedTime}
            </p>
        </div>
    )
}
