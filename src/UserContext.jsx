import { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext({
    users: [],
    loading: true,
    addUser: () => {},
    deleteUser: () => {},
    updateUser: () => {},
    clearUsers: () => {},
    userCount: 0
});

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Charger les utilisateurs depuis localStorage au montage
    useEffect(() => {
        try {
            const storedUsers = localStorage.getItem('users');
            if (storedUsers) {
                const parsedUsers = JSON.parse(storedUsers);
                setUsers(Array.isArray(parsedUsers) ? parsedUsers : []);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Sauvegarder automatiquement dans localStorage quand users change
    useEffect(() => {
        if (!loading) { // Éviter de sauvegarder lors du chargement initial
            try {
                localStorage.setItem('users', JSON.stringify(users));
            } catch (error) {
                console.error('Erreur lors de la sauvegarde:', error);
            }
        }
    }, [users, loading]);

    // Fonction pour ajouter un utilisateur
    const addUser = (userData) => {
        const newUser = {
            id: Date.now(), // ID simple basé sur timestamp
            name: userData.name.trim(),
            phoneNumber: userData.phoneNumber?.trim() || '',
            country: userData.country || '',
            createdAt: new Date().toISOString()
        };
        setUsers(prevUsers => [...prevUsers, newUser]);
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = (userId) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    };

    // Fonction pour mettre à jour un utilisateur
    const updateUser = (userId, userData) => {
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === userId 
                    ? { 
                        ...user, 
                        ...userData,
                        updatedAt: new Date().toISOString()
                      }
                    : user
            )
        );
    };

    // Fonction pour vider tous les utilisateurs
    const clearUsers = () => {
        setUsers([]);
    };

    // Valeur du contexte
    const contextValue = {
        users,
        loading,
        addUser,
        deleteUser,
        updateUser,
        clearUsers,
        userCount: users.length
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte
export function useUsers() {
    const context = useContext(UserContext);
    
    if (!context) {
        throw new Error('useUsers doit être utilisé dans un UserProvider');
    }
    
    return context;
}

// Hook pour un utilisateur spécifique
export function useUser(userId) {
    const { users } = useUsers();
    return users.find(user => user.id === userId) || null;
}