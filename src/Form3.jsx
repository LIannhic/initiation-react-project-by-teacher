import React, { useState, useRef, useEffect } from 'react';

function Form({ users, setUsers }) {
  // ✅ États pour les champs du formulaire
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // ✅ Valeur choisie (pays final) et terme de recherche (pour l’autocomplétion)
  const [country, setCountry] = useState("");      
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Liste des pays récupérés depuis l'API selon le terme recherché
  const [countries, setCountries] = useState([]);

  // ✅ États pour l'affichage conditionnel (chargement / erreur)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Refs pour gérer le debounce et focus utilisateur
  const timeoutRef = useRef(null);
  const inputRef = useRef(null);

  // 🔽 Gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // ➕ Ajout du nouvel utilisateur dans le tableau
    const updatedUsers = [...users, { name, phoneNumber, country }];
    setUsers(updatedUsers);

    // 🔄 Réinitialisation des champs
    setName("");
    setPhoneNumber("");
    setCountry("");
    setSearchTerm("");
    setCountries([]);

    // 💾 Sauvegarde dans le localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // 🧠 Gestion du champ nom
  function handleName(e) {
    setName(e.target.value);
  }

  // 🧠 Gestion du champ numéro de téléphone
  function handlePhoneNumber(e) {
    setPhoneNumber(e.target.value);
  }

  // 🔍 Déclenche la recherche de pays avec debounce (évite des appels excessifs à l’API)
  function handleCountry(searchValue) {
    setSearchTerm(searchValue);

    if (!searchValue) {
      setCountries([]);
      return;
    }

    // ⏱️ Annule le timeout précédent s’il existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // ⏳ Crée un nouveau timeout (500ms) avant d’effectuer la requête
    timeoutRef.current = setTimeout(() => {
      fetchCountries(searchValue);
    }, 500);
  }

  // 🌍 Fonction asynchrone pour récupérer la liste des pays correspondant au terme
  const fetchCountries = async (searchTerm) => {
    if (searchTerm === "") {
      setCountries([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchTerm}?fields=name,cca3`
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      setCountries(data);

      // ✅ Restauration du focus après mise à jour DOM
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);

    } catch (err) {
      setError(err.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Nettoyage automatique du timeout lors du démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 👆 Lorsqu'un pays est choisi dans la liste
  function handleChooseCountry(e, countryName) {
    e.preventDefault();

    setCountry(countryName);
    setSearchTerm(countryName);  // Affichage dans l’input
    setCountries([]);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  // 🧾 Affichage du formulaire
  return (
    <form onSubmit={handleSubmit}>
      {/* 🧑 Champ nom */}
      <label>Name : <br /></label>
      <input
        type="text"
        placeholder="Enter your name"
        required
        value={name}
        onChange={handleName}
      />
      <br />

      {/* 🌍 Champ pays avec autocomplétion */}
      <label>
        Country: <br />
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your country"
          value={searchTerm}
          onChange={(e) => handleCountry(e.target.value)}
          required
        />
        {/* 🔄 Indicateurs d’état pour le chargement ou l’erreur */}
        {loading && <p>Recherche en cours...</p>}
        {error && <p>Erreur : {error}</p>}

        {/* 📃 Liste des résultats de recherche */}
        <ul>
          {countries.map((countryItem) => (
            <li key={countryItem.cca3}>
              <a href="#" onClick={(e) => handleChooseCountry(e, countryItem.name.common)}>
                {countryItem.name.common}
              </a>
            </li>
          ))}
        </ul>
      </label>
      <br />

      {/* 📞 Champ téléphone */}
      <label>
        Phone Number: <br />
        <input
          type="tel"
          placeholder="Enter your phone number"
          required
          value={phoneNumber}
          onChange={handlePhoneNumber}
        />
      </label>
      <br />

      {/* ✅ Bouton de soumission */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
