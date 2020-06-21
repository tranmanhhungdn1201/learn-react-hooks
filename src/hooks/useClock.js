import { useState, useEffect } from 'react';

function formatDate(date){
    if(!date) return '';

    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const sec = `0${ date.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${sec}`;
}

function useClock() {
    const [timeString, setTimeString] = useState('');
    useEffect(() => {
        const getTimeClock = setInterval(() =>{
            const now = new Date();
            const newTimeString = formatDate(now);
            setTimeString(newTimeString);
        }, 1000);
        return () => {
            clearInterval(getTimeClock);
        }
    }, [])
    return {timeString};
}

export default useClock;