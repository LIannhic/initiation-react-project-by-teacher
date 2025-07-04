// Importation des modules nécessaires depuis React
import React, { useState, useEffect } from 'react'

// Déclaration du composant fonctionnel Clock
function Clock() {
    // État local `time` contenant l'heure actuelle, sous forme de chaîne (HH:MM:SS)
    // Initialisé avec l'heure du moment (convertie en chaîne localisée)
    const [time, setTime] = useState(new Date().toLocaleTimeString())

    // Hook useEffect exécuté après le premier rendu (grâce au tableau de dépendances vide)
    useEffect(() => {
    // Définition d’un intervalle qui met à jour l’état `time` toutes les secondes
        const interval = setInterval(() => {
            // On actualise l’heure affichée avec la nouvelle valeur actuelle
            setTime(new Date().toLocaleTimeString())
        }, 1000) // 1000 millisecondes = 1 seconde

        // Nettoyage de l’intervalle lorsque le composant est démonté
        // Cela évite les fuites mémoire ou l'accumulation d'intervalles
        return () => clearInterval(interval)
    }, [])

    // Rendu du composant Clock
    return (
        <div>
            {/* Affichage de l’heure courante dans une balise <span>
            - La classe "clock" permet de styliser cette zone via le CSS
            - L’heure est actualisée automatiquement chaque seconde
            */}
            <span className="clock">{time}</span>
        </div>
    )
}

// Exportation du composant pour l’utiliser dans App ou ailleurs
export default Clock
