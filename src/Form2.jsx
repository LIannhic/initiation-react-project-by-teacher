// Importation des hooks React
import React, { useState, useEffect } from 'react';

// Composant Form2, recevant deux props :
// - users : liste actuelle des utilisateurs
// - setUsers : fonction pour mettre à jour la liste
function Form2({ users, setUsers }) {
  // États pour les champs du formulaire
  const [name, setName] = useState("");               // Nom saisi
  const [phoneNumber, setPhoneNumber] = useState(""); // Numéro de téléphone saisi
  const [country, setCountry] = useState("");         // Pays sélectionné

  // États liés au chargement et gestion d'erreur des pays
  const [countries, setCountries] = useState([]);     // Liste des pays récupérés
  const [loading, setLoading] = useState(false);      // Indique si les pays sont en cours de chargement
  const [error, setError] = useState(null);           // Contient un message d'erreur le cas échéant

  // 🔄 useEffect : exécute fetchCountries une seule fois au montage du composant
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fonction asynchrone pour récupérer la liste des pays depuis une API publique
  const fetchCountries = async () => {
    setLoading(true);   // Drapeau de chargement activé
    setError(null);     // Réinitialiser les erreurs précédentes

    try {
      // Requête à l'API REST Countries pour obtenir les noms et codes de pays
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3');

      // Vérification du succès de la requête
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des pays');
      }

      const data = await response.json();

      // Trie alphabétique des pays selon leur nom commun
      const sortedCountries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      // Mise à jour de l'état
      setCountries(sortedCountries);
    } catch (err) {
      // En cas d’erreur, affichage d’un message
      setError(err.message);
      setCountries([]);
    } finally {
      // Le chargement est terminé, qu'il ait réussi ou échoué
      setLoading(false);
    }
  };

  // Gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Validation simple : tous les champs doivent être remplis
    if (!name.trim() || !phoneNumber.trim() || !country) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Création d’un nouvel utilisateur avec les champs propres
    const updatedUsers = [...users, {
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      country
    }];

    // Mise à jour de la liste
    setUsers(updatedUsers);

    // Réinitialisation des champs
    setName("");
    setPhoneNumber("");
    setCountry("");

    // Sauvegarde dans le localStorage (persistance)
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Gestion des changements de champs
  function handleName(e) {
    const name = e.target.value;
    setName(name);
  }

  function handlePhoneNumber(e) {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  }

  function handleCountry(e) {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
  }

  // ⬇️ Rendu du formulaire utilisateur
  return (
    <form onSubmit={handleSubmit}>
      {/* Champ de saisie du nom */}
      <div>
        <label htmlFor="name">Nom :</label>
        <input
          id="name"
          type="text"
          placeholder="Entrez votre nom"
          required
          value={name}
          onChange={handleName}
        />
      </div>

      {/* Champ de saisie du numéro de téléphone */}
      <div>
        <label htmlFor="phone">Téléphone :</label>
        <input
          id="phone"
          type="tel"
          placeholder="Entrez votre téléphone"
          required
          value={phoneNumber}
          onChange={handlePhoneNumber}
        />
      </div>

      {/* Menu déroulant pour sélectionner un pays */}
      <div>
        <label htmlFor="country">Pays :</label>

        {loading ? (
          // Affichage durant le chargement de la liste des pays
          <p>Chargement des pays...</p>
        ) : error ? (
          // Affichage en cas d’erreur avec possibilité de réessayer
          <div>
            <p style={{ color: 'red' }}>Erreur : {error}</p>
            <button type="button" onClick={fetchCountries}>
              Réessayer
            </button>
          </div>
        ) : (
          // Liste déroulante des pays disponibles
          <select
            id="country"
            value={country}
            onChange={handleCountry}
            required
          >
            {/* Valeur par défaut non sélectionnée */}
            <option value="">Sélectionnez un pays</option>

            {/* Génération dynamique des options depuis l’API */}
            {countries.map((countryItem) => (
              <option
                key={countryItem.cca3}
                value={countryItem.name.common}
              >
                {countryItem.name.common}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Bouton de soumission du formulaire */}
      <button type="submit" disabled={loading}>
        {/* Texte du bouton change selon l’état de chargement */}
        {loading ? 'Chargement...' : 'Ajouter'}
      </button>
    </form>
  );
}

// Export du composant Form2 pour utilisation dans App
export default Form2;
