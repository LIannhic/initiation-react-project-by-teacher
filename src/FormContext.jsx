import React, { useState } from 'react';
import { useUsers } from './UserContext';

function Form() {
    const { addUser, loading } = useUsers();
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        country: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            alert('Le nom est requis');
            return;
        }

        addUser(formData);
        
        // Réinitialiser le formulaire
        setFormData({
            name: '',
            phoneNumber: '',
            country: ''
        });
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nom"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
            />
            <input
                type="tel"
                placeholder="Téléphone"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
            <input
                type="text"
                placeholder="Pays"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default Form;