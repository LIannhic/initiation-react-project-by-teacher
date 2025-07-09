import React, { useState, useEffect } from 'react';

function Clock(){
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
        }, 1000);
        //useEffect crée un nouvel interval à chaque appel. 
        //On supprime donc l'ancien à chaque passage pour éviter la surcharge
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
        <span className="clock">{time}</span>
        </div>
    );
}

export default Clock;