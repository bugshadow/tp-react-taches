import { useState } from "react";

function Formulaire({ onAjouter }) {
  const [titre, setTitre] = useState("");
  const vide = titre.trim() === "";

  function soumettre(evenement) {
    evenement.preventDefault();
    if (vide) return;
    onAjouter(titre.trim());
    setTitre("");
  }

  return (
    <form className="formulaire" onSubmit={soumettre}>
      <input
        type="text"
        value={titre}
        onChange={(evenement) => setTitre(evenement.target.value)}
        placeholder="Écrire une nouvelle tâche…"
        aria-label="Titre de la nouvelle tâche"
      />
      <button type="submit" className="principal" disabled={vide}>
        Ajouter
      </button>
    </form>
  );
}

export default Formulaire;
