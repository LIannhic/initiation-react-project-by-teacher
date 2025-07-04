// Déclaration et exportation du composant fonctionnel Button
export default function Button() {
    // Déclaration d'une variable locale (non réactive) `count` initialisée à 0
    // ⚠️ Ce n'est pas un état React (useState), donc toute modification de `count` ici
    // ne provoquerait pas de re-rendu automatique du composant.
    let count = 0

    return (
        <>
            {/* Affichage conditionnel :
                - Si count === 0, alors on affiche le paragraphe "Test"
                - Comme count vaut 0 en permanence ici, ce paragraphe s'affichera toujours
            */}
            {count === 0 && <p>Test</p>}

            {/* Bouton stylisé en ligne (CSS inline) :
                - Couleur de fond : bleu
                - Texte : blanc
                - Padding, coins arrondis, curseur pointeur
                - Affiche la valeur actuelle de count (ici toujours 0)
            */}
            <button
                style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                {/* Affichage du contenu du bouton (la valeur de `count`) */}
                {count}
            </button>
        </>
    )
}
