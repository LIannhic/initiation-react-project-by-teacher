import React, { useRef } from 'react';
import { useCountrySearch } from './useCountrySearch';

export function CountryAutocomplete({ value, onChange, error }) {
    const { searchTerm, setSearchTerm, countries, loading } = useCountrySearch();
    const inputRef = useRef(null);

    const handleInputChange = (inputValue) => {
        setSearchTerm(inputValue);
    };

    const handleSelectCountry = (countryName) => {
        onChange(countryName); // Met à jour la valeur dans le formulaire parent
        setSearchTerm(countryName); // Affiche le pays sélectionné dans l'input
        
        // Maintenir le focus
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    };

    return (
        <div className="country-autocomplete">
            <input
                ref={inputRef}
                id="country"
                type="text"
                placeholder="Entrez votre pays"
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                aria-invalid={!!error}
            />
            
            {loading && <div className="loading">Recherche en cours...</div>}
            
            {countries.length > 0 && (
                <ul className="country-list">
                    {countries.map((country) => (
                        <li key={country.cca3}>
                            <button
                                type="button"
                                onClick={() => handleSelectCountry(country.name.common)}
                                className="country-option"
                            >
                                {country.name.common}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            
            {error && <span className="error">{error}</span>}
        </div>
    );
}