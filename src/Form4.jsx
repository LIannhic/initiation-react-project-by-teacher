import React, { useState } from 'react';
import { CountryAutocomplete } from './CountryAutoComplete';

function Form4() {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
        if (!formData.country.trim()) newErrors.country = 'Le pays est requis';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Le téléphone est requis';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Données valides:', formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <label htmlFor="name">Nom :</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Entrez votre nom"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    aria-invalid={!!errors.name}
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div>
                <label>Pays :</label>
                <CountryAutocomplete
                    value={formData.country}
                    onChange={(value) => handleInputChange('country', value)}
                    error={errors.country}
                />
            </div>

            <div>
                <label htmlFor="phone">Téléphone :</label>
                <input
                    id="phone"
                    type="tel"
                    placeholder="Entrez votre téléphone"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    aria-invalid={!!errors.phoneNumber}
                />
                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </div>

            <button type="submit">Soumettre</button>
        </form>
    );
}

export default Form4;