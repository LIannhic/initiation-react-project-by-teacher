// ✅ Importation de StrictMode :
// Il s'agit d'un composant spécial de React qui active des vérifications supplémentaires
// en mode développement pour aider à détecter des erreurs potentielles.
import { StrictMode } from 'react'

// ✅ Importation de createRoot (React 18+) depuis react-dom/client :
// Cette API permet de créer un "root concurrent", offrant des fonctionnalités modernes
// comme le rendu asynchrone et les transitions.
import { createRoot } from 'react-dom/client'

// ✅ Importation du fichier CSS global
import './index.css'

// ✅ Importation du composant racine de l'application
import App from './App.jsx'

// ✅ Point d'entrée de l'application React :
// - Récupération de l'élément HTML avec l'ID "root" (défini dans index.html)
// - Création du root React et rendu du composant <App />
// - L'ensemble est enveloppé dans <StrictMode> pour activer les bonnes pratiques de développement.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
