import { useState } from 'react';
import { Button } from '@mui/material';
import { OrderRequestBody, TicketDto, } from '../../../../../models/waiter.model';
import { WaiterTable } from './Tables/WaiterTable';
import { useCurrentTime } from '../../../../../hooks/useCurrentTime';
import { postOrder } from '../../../../../api/waiter';
import { SuccessAlert } from '../../../../../components/Alerts/SuccessAlert';

interface FormatDateDto {
  hour: string
  date: string
}

export const Ticket: React.FC<TicketDto> = ({ orders, setOrders }) => {
  const [table, setTable] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { formattedTime } = useCurrentTime();
  const sendValidation = orders.length == 0 || table === '' ? true : false;

  const formatDate = (): FormatDateDto => {
    const dayAndHour = formattedTime.split(", ");
    return {
      date: dayAndHour[0],
      hour: dayAndHour[1]
    }
  }

  const orderBody: OrderRequestBody = {
    table,
    products: orders,
    entry_hour: formatDate().hour,
    exit_hour: '',
    date: formatDate().date,
    time: '',
    status: 'pending'
  }

  const sendOrder = async () => {
    try {
      const res = await postOrder(orderBody);
      console.log(res)
      if (Object.keys(res).length !== 0) {
        setOrders([]);
        setTable('');
      }
      setOpen(true);
      setTimeout(() => {
        setOpen(false)
      }, 2000);
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <>
      <div className='ticket-container'>
        <WaiterTable rows={orders} setOrders={setOrders} formattedTime={formattedTime} table={table} setTable={setTable} />
        <Button disabled={sendValidation} className='send-btn' variant="outlined" onClick={() => { sendOrder() }}>Enviar</Button>
        <SuccessAlert open={open} setOpen={setOpen} text='Orden enviada correctamente' />
      </div>
    </>
  );
}