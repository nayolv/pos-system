import { useState } from 'react';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { WaiterTable } from './Tables/WaiterTable';
import { TicketDto } from '../../../../models/waiter.model';
import { useCurrentTime } from '../../../../hooks/useCurrentTime';
import { createOrder } from '../../../../api/waiter';
import { orderBody } from '../../../../helpers/Waiter/helper';
import { SuccessAlert } from '../../../Alerts/SuccessAlert';


export const Ticket: React.FC<TicketDto> = ({ orders, setOrders }) => {
  const [table, setTable] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { formattedTime } = useCurrentTime();

  const sendValidation = orders.length == 0 || table === '' ? true : false;

  const mutation = useMutation(
    createOrder,
    {
      onSuccess: () => {
        setOrders([]);
        setTable('');
        setOpen(true);
        return setTimeout(() => {
          setOpen(false)
        }, 2000);
      },
      onError: (error) => {
        console.warn(error);
      }
    }
  )

  const sendOrder = async () => {
    mutation.mutate(orderBody(table, orders, formattedTime));
  };

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