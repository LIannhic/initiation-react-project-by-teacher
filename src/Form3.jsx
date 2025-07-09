import React, { useState, useRef, useEffect } from 'react';

function Form({users, setUsers}) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUsers = [...users, { name, phoneNumber, country }];
        setUsers(updatedUsers);
        setName("");
        setPhoneNumber("");
        setCountry("");
        setSearchTerm("");
        setCountries([]);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    function handleName(e){
        const name = e.target.value;
        setName(name);
    }

    function handlePhoneNumber(e){
        const phoneNumber = e.target.value;
        setPhoneNumber(phoneNumber);
    }

    // Fonction handleCountry corrigée avec debounce
    function handleCountry(searchValue) {
        setSearchTerm(searchValue);
        
        if (!searchValue) {
            setCountries([]);
            return;
        }

        // Nettoyer le timeout précédent
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Créer un nouveau timeout
        timeoutRef.current = setTimeout(() => {
            fetchCountries(searchValue);
        }, 500);
    }

    const fetchCountries = async (searchTerm) => {
        if (searchTerm === "") {
            setCountries([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}?fields=name,cca3`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json();
            setCountries(data);
        } catch (err) {
            setError(err.message);
            setCountries([]);
        } finally {
            setLoading(false);
        }
    };

    // Nettoyage du timeout lors du démontage du composant
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    function handleChooseCountry(e, countryName) {
        e.preventDefault();
        setCountry(countryName);
        setSearchTerm(countryName);
        setCountries([]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name : <br /></label>
            <input
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={handleName}
            />
            <br />
            
            <label>
                Country: <br />
                <input
                    type="text"
                    placeholder="Enter your country"
                    value={searchTerm}
                    onChange={(e) => handleCountry(e.target.value)}
                    required
                />
                {loading && <p>Recherche en cours...</p>}
                {error && <p>Erreur : {error}</p>}
                <ul>
                    {countries.map((countryItem) => (
                        <li key={countryItem.cca3}>
                            <a href="#" onClick={(e) => handleChooseCountry(e, countryItem.name.common)}>
                                {countryItem.name.common}
                            </a>
                        </li>
                    ))}
                </ul>
            </label>
            <br />
            
            <label>
                Phone Number: <br />
                <input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                />
            </label>
            <br />
            
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;