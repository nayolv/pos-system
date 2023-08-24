import { useState, useEffect } from 'react';

export const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const options = {
        day: '2-digit' as const,
        month: '2-digit' as const,
        year: 'numeric' as const,
        hour: 'numeric' as const,
        minute: 'numeric' as const,
        second: 'numeric' as const,
        hour12: false
    };

    const formattedTime = new Intl.DateTimeFormat('es-ES', options).format(currentTime).replace(/\//g, '-');

    return {
        formattedTime
    }
};