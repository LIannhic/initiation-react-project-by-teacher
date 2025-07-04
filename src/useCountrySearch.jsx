import { useState, useEffect, useRef } from 'react';

export function useCountrySearch(delay = 500) {
    const [searchTerm, setSearchTerm] = useState('');
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);

    const fetchCountries = async (term) => {
        if (!term) {
            setCountries([]);
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${term}?fields=name,cca3`);
            if (!response.ok) throw new Error('Erreur de récupération');
            
            const data = await response.json();
            setCountries(data);
        } catch (err) {
            setError(err.message);
            setCountries([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            fetchCountries(searchTerm);
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [searchTerm, delay]);

    return {
        searchTerm,
        setSearchTerm,
        countries,
        loading,
        error
    };
}