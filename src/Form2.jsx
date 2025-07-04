import React, { useState, useEffect } from 'react';

function Form({users, setUsers}) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Charger la liste des pays au montage du composant
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des pays');
            }
            const data = await response.json();
            // Trier les pays par ordre alphabétique
            const sortedCountries = data.sort((a, b) => 
                a.name.common.localeCompare(b.name.common)
            );
            setCountries(sortedCountries);
        } catch (err) {
            setError(err.message);
            setCountries([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation basique
        if (!name.trim() || !phoneNumber.trim() || !country) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        const updatedUsers = [...users, { name: name.trim(), phoneNumber: phoneNumber.trim(), country }];
        setUsers(updatedUsers);
        setName("");
        setPhoneNumber("");
        setCountry("");
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

    function handleCountry(e){
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nom :</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Entrez votre nom"
                    required
                    value={name}
                    onChange={handleName}
                />
            </div>

            <div>
                <label htmlFor="phone">Téléphone :</label>
                <input
                    id="phone"
                    type="tel"
                    placeholder="Entrez votre téléphone"
                    required
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                />
            </div>

            <div>
                <label htmlFor="country">Pays :</label>
                {loading ? (
                    <p>Chargement des pays...</p>
                ) : error ? (
                    <div>
                        <p style={{color: 'red'}}>Erreur : {error}</p>
                        <button type="button" onClick={fetchCountries}>
                            Réessayer
                        </button>
                    </div>
                ) : (
                    <select
                        id="country"
                        value={country}
                        onChange={handleCountry}
                        required
                    >
                        <option value="">Sélectionnez un pays</option>
                        {countries.map((countryItem) => (
                            <option key={countryItem.cca3} value={countryItem.name.common}>
                                {countryItem.name.common}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Chargement...' : 'Ajouter'}
            </button>
        </form>
    );
}

export default Form;