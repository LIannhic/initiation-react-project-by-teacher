import React, { useState } from 'react';

export default function User({ user, users, id, setUsers, phoneNumber, country }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(user);
    const [editedPhone, setEditedPhone] = useState(phoneNumber || '');
    const [editedCountry, setEditedCountry] = useState(country || '');

    function deleteUser(id) {
        const updatedUsers = users.filter((item, i) => i !== id);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    function handleEditToggle() {
        if (isEditing) {
            // Annuler l'édition - remettre les valeurs originales
            setEditedName(user);
            setEditedPhone(phoneNumber || '');
            setEditedCountry(country || '');
        }
        setIsEditing(!isEditing);
    }

    function handleSave() {
        // Mettre à jour l'utilisateur dans la liste
        const updatedUsers = users.map((item, i) => {
            if (i === id) {
                return {
                    name: editedName.trim(),
                    phoneNumber: editedPhone.trim(),
                    country: editedCountry.trim()
                };
            }
            return item;
        });

        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setIsEditing(false);
    }

    return (
        <div className="user-item">
            {isEditing ? (
                <div className="user-edit-form">
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Nom"
                        autoFocus
                    />
                    <input
                        type="tel"
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                        placeholder="Téléphone"
                    />
                                        <input
                        type="text"
                        value={editedCountry}
                        onChange={(e) => setEditedCountry(e.target.value)}
                        placeholder="Pays"
                    />
                    <div className="edit-buttons">
                        <button onClick={handleSave} className="save-btn">
                            Sauvegarder
                        </button>
                        <button onClick={handleEditToggle} className="cancel-btn">
                            Annuler
                        </button>
                    </div>
                </div>
            ) : (
                <div className="user-display">
                    <span className="user-name">{user}</span>
                    {phoneNumber && <span className="user-phone"> - Phone: {phoneNumber}</span>}
                    {country && <span className="user-country"> - Country: {country}</span>}
                    <div className="user-buttons">
                        <button onClick={handleEditToggle} className="edit-btn">
                            Éditer
                        </button>
                        <button onClick={() => deleteUser(id)} className="delete-btn">
                            Supprimer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}