import React from 'react';
import { useUsers } from './UserContext';

function UsersList() {
    const { users, deleteUser, userCount, loading } = useUsers();

    if (loading) {
        return <div>Chargement des utilisateurs...</div>;
    }

    return (
        <div>
            <h2>Liste des utilisateurs ({userCount})</h2>
            {userCount === 0 ? (
                <p>Aucun utilisateur trouvé</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <span>{user.name}</span>
                            {user.phoneNumber && <span> - {user.phoneNumber}</span>}
                            {user.country && <span> ({user.country})</span>}
                            <button onClick={() => deleteUser(user.id)}>
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UsersList;