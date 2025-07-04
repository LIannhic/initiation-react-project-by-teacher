// Importation des logos de React et Vite
import reactLogo from './assets/react.svg' // Logo de React (local)
import viteLogo from '/vite.svg'           // Logo de Vite (public depuis la racine du projet)

// Déclaration et exportation du composant fonctionnel Header
export default function Header() {
  return (
    <>
      {/* Bloc contenant les deux logos cliquables */}
      <div>
        {/* Lien vers le site officiel de Vite (ouvre dans un nouvel onglet) */}
        <a href="https://vite.dev" target="_blank">
          {/* Image du logo Vite :
              - src : chemin de l'image
              - className : permet de styler avec CSS
              - alt : texte alternatif pour l'accessibilité
          */}
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        {/* Lien vers le site officiel de React (ouvre dans un nouvel onglet) */}
        <a href="https://react.dev" target="_blank">
          {/* Image du logo React :
              - className combine "logo" (style générique) et "react" (style spécifique à React)
              - Peut être animé ou stylisé différemment avec CSS
          */}
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Titre principal de la page (sous les logos) */}
      <h1>Vite + React</h1>

      {/* Paragraphe informatif :
          - Encourage l'utilisateur à cliquer sur les logos
          - La classe "read-the-docs" peut styliser le texte (ex. couleur, italique, espacement)
      */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
