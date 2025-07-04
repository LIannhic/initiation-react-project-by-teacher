// Importation des hooks React pour la gestion d'état et des effets de bord
import { useState, useEffect } from 'react'

// Importation des styles CSS globaux
import './App.css'

// Importation des composants enfants
import UsersList from './UsersList.jsx'        // Affiche la liste des utilisateurs
import Count from './Count.jsx'                // Affiche un compteur et des boutons pour le modifier
import Form from './Form.jsx'                  // Formulaire d'ajout d'un utilisateur
import Header from './Header.jsx'              // En-tête de l'application
import DeleteButton from './DeleteButton.jsx'  // Bouton pour supprimer tous les utilisateurs
import Clock from './Clock.jsx'                // Affiche une horloge en temps réel
import Search from './Search.jsx'              // Champ de recherche pour filtrer les utilisateurs
import CountryList from './CountryList.jsx'    // Liste ou sélection de pays

// Définition du composant principal de l'application
function App() {
  // Déclaration d’un état local pour le compteur (entier)
  const [count, setCount] = useState(0)

  // État local pour stocker la liste des utilisateurs (tableau d'objets)
  const [users, setUsers] = useState([])

  // État local pour stocker la valeur de recherche (chaîne de caractères)
  const [search, setSearch] = useState('')

  // Filtrage dynamique des utilisateurs selon la valeur de recherche :
  // - correspondance partielle dans le nom (insensible à la casse)
  // - ou correspondance exacte dans le numéro de téléphone
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.phoneNumber.includes(search)
  )

  // useEffect exécuté au montage du composant uniquement (grâce au tableau de dépendances vide)
  useEffect(() => {
    console.log('Load')  // Pour débogage : indique que le composant s’est monté

    // Lecture de la clé 'users' dans le localStorage
    const storedUsers = localStorage.getItem('users')

    // Si des utilisateurs sont présents, on les parse depuis le format JSON
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  // Rendu JSX : structure visuelle de l'application
  return (
    <>
      {/* En-tête de la page */}
      <Header />

      {/* Horloge en temps réel */}
      <Clock />

      {/* Composant compteur : permet d'incrémenter/décrémenter une valeur */}
      <Count count={count} setCount={setCount} />

      {/* Formulaire d'ajout d'un utilisateur (utilise l'état users pour ajouter un nouvel utilisateur) */}
      <Form users={users} setUsers={setUsers} />

      {/* Champ de recherche (filtrage en direct) */}
      <Search search={search} setSearch={setSearch} />

      {/* Liste des utilisateurs, déjà filtrée selon la recherche */}
      <UsersList users={filteredUsers} setUsers={setUsers} />

      {/* Bouton pour supprimer tous les utilisateurs */}
      <DeleteButton setUsers={setUsers} />
    </>
  )
}

// Exportation du composant pour pouvoir l’utiliser ailleurs dans l'application
export default App
