// Déclaration et exportation du composant fonctionnel Count
// Il reçoit deux props :
// - count : la valeur actuelle du compteur (état géré dans le parent App)
// - setCount : fonction pour modifier la valeur du compteur
export default function Count({ count, setCount }) {
    return (
        // Conteneur principal stylisé avec la classe CSS "card"
        <div className="card">
            {/* Bouton qui, lorsqu'on clique dessus, incrémente le compteur de 1
            - Utilise une fonction fléchée pour récupérer la valeur actuelle
            - React garantit que cette mise à jour est sûre même en cas de multiples clics rapides
            */}
            <button onClick={() => setCount((count) => count + 1)}>
                {/* Affiche le texte dynamique avec la valeur actuelle du compteur */}
                count is {count}
            </button>

            {/* Paragraphe informatif, probablement lié au mode développement
                - HMR : Hot Module Replacement, fonctionnalité de Vite pour recharger les modules sans perdre l'état
            */}
            <p>
                Edit <code>src/App.jsx</code> and save to test HMR
            </p>
        </div>
    )
}
