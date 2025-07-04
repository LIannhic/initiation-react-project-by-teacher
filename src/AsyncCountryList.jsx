import React, { useState, useEffect } from 'react';

function CountryList() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
            console.log(response);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json();
            setCountries(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Chargement des pays...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <div>
            <h1>Liste des pays</h1>
            <ul>
                {countries.map((country) => (
                    <li key={country.cca3}>{country.name.common}</li>
                ))}
            </ul>
        </div>
    );
}

export default CountryList;