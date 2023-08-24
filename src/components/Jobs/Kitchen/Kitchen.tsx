import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PENDING } from '../../../constants/constants';
import { getOrdersByStatus, getOrdersStatus } from '../../../api/kitchen';
import { OrdersStatusDto } from '../../../models/kitchen.model';
import Orders from './Orders';
import './kitchen.scss';

export const Kitchen = () => {
    const [status, setStatus] = useState(PENDING);
    const statusQuery = useQuery(['status'], getOrdersStatus);
    const ordersByStatusQuery = useQuery(['orders', status], () => getOrdersByStatus(status));

    const handleStatus = (status: string) => {
        setStatus(status);
    };

    return (
        <div className="orders-container">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {statusQuery.isLoading ?
                        <p>Cargando...</p>
                        :
                        statusQuery.data?.map(({ id, tag, category }: OrdersStatusDto, i: number) => (
                            <button
                                key={id}
                                className={`nav-link ${i === 0 ? 'active' : ''}`}
                                id={`tab-${tag}`}
                                data-bs-toggle="tab"
                                data-bs-target={`${i === 0 ? '#nav-home' : tag}`}
                                type="button"
                                role="tab"
                                aria-controls={`${i === 0 ? 'nav-home' : tag}`}
                                aria-selected="true"
                                onClick={() => {
                                    handleStatus(tag)
                                }}>
                                {category}
                            </button>
                        ))}
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                {ordersByStatusQuery.isFetching ?
                    <p>Cargando...</p>
                    :
                    statusQuery.data?.map(({ id, tag }: OrdersStatusDto, i: number) => (
                        <div
                            key={id}
                            id={`${i === 0 ? 'home' : tag}`}
                            className={`tab-pane fade show ${i === 0 ? 'active' : ''}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${tag}`}>
                            <Orders orders={ordersByStatusQuery.data} status={status} />
                        </div>
                    ))}
            </div>
        </div>
    )
}