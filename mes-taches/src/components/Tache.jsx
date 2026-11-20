import { useState } from "react";

function Tache({ id, titre, terminee, onBasculer, onSupprimer, onModifier }) {
  const [enEdition, setEnEdition] = useState(false);
  const [brouillon, setBrouillon] = useState(titre);
  const classe = terminee ? "tache terminee" : "tache";

  function commencerEdition() {
    setBrouillon(titre);
    setEnEdition(true);
  }

  function valider() {
    const nouveauTitre = brouillon.trim();
    if (nouveauTitre !== "" && nouveauTitre !== titre) {
      onModifier(id, nouveauTitre);
    } else {
      setBrouillon(titre);
    }
    setEnEdition(false);
  }

  function annuler() {
    setBrouillon(titre);
    setEnEdition(false);
  }

  return (
    <li className={classe}>
      <input
        type="checkbox"
        checked={terminee}
        onChange={() => onBasculer(id)}
      />
      {enEdition ? (
        <input
          type="text"
          autoFocus
          value={brouillon}
          onChange={(evenement) => setBrouillon(evenement.target.value)}
          onFocus={(evenement) => evenement.target.select()}
          onBlur={valider}
          onKeyDown={(evenement) => {
            if (evenement.key === "Enter") valider();
            if (evenement.key === "Escape") annuler();
          }}
          aria-label="Modifier le titre de la tâche"
        />
      ) : (
        <span
          className="titre"
          onDoubleClick={commencerEdition}
          title="Double-cliquez pour modifier"
        >
          {titre}
        </span>
      )}
      <button className="danger" onClick={() => onSupprimer(id)}>
        Supprimer
      </button>
    </li>
  );
}

export default Tache;
