// ✅ Import des hooks React nécessaires
import { useState, useEffect } from 'react'

// ✅ Import des styles globaux de l'application
import './App.css'

// ✅ Importation des composants de l’application
import UsersList from './UsersList.jsx'
import Count from './Count.jsx'
import Form from './Form.jsx'          // (ou Form2 selon ta structure)
import Header from './Header.jsx'
import DeleteButton from './DeleteButton.jsx'
import Clock from './Clock.jsx'
import Search from './Search.jsx'
import CountryList from './CountryList.jsx'

function App() {
  // 🎯 État local pour le compteur (utilisé avec <Count />)
  const [count, setCount] = useState(0)

  // 🎯 État contenant la liste des utilisateurs (affichée dans <UsersList />)
  const [users, setUsers] = useState([])

  // 🎯 État pour le champ de recherche (utilisé par <Search /> pour filtrer)
  const [search, setSearch] = useState('')

  // 🔍 Liste filtrée des utilisateurs selon le critère de recherche
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.phoneNumber.includes(search)
  )

  // 🧠 useEffect exécuté au premier rendu pour recharger les utilisateurs stockés localement
  useEffect(() => {
    console.log('Load') // Log utile pour le debug en développement
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers)) // Restauration depuis le localStorage
    }
  }, [])

  return (
    <>
      {/* 🧩 En-tête de l’application avec les logos Vite et React */}
      <Header />

      {/* 🕒 Affiche l’heure actuelle, mise à jour chaque seconde */}
      <Clock />

      {/* 🌍 Liste des pays disponibles (peut être utilisée ailleurs dans le formulaire) 
      <CountryList />
      */}

      {/* 🔢 Composant compteur avec bouton +1 */}
      <Count count={count} setCount={setCount} />

      {/* 📋 Formulaire pour ajouter un utilisateur (nom, téléphone, pays) */}
      <Form users={users} setUsers={setUsers} />

      {/* 🔎 Barre de recherche filtrant les utilisateurs par nom ou numéro */}
      <Search search={search} setSearch={setSearch} />

      {/* 👥 Liste filtrée des utilisateurs affichés dynamiquement */}
      <UsersList users={filteredUsers} setUsers={setUsers} />

      {/* 🗑️ Bouton pour supprimer tous les utilisateurs de la liste */}
      <DeleteButton setUsers={setUsers} />
    </>
  )
}

// ✅ Exportation du composant principal de l'application
export default App
