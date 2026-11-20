import { useState } from "react";
import Entete from "./components/Entete";
import Pied from "./components/Pied";
import ListeTaches from "./components/ListeTaches";
import Carte from "./components/carte.jsx";
import Compteur from "./components/Compteur";

const TITRE = "Mes tâches";
const SOUS_TITRE = "Mon premier projet React";
const AUTEUR = "BOUHADDACH OMAR";

const TACHES_INITIALES = [
  { id: 1, titre: "Installer Node.js et Vite", terminee: true },
  { id: 2, titre: "Comprendre les composants", terminee: true },
  { id: 3, titre: "Passer des données avec les props", terminee: false },
  { id: 4, titre: "Gérer l'état avec useState", terminee: false },
];

function App() {
  const [taches, setTaches] = useState(TACHES_INITIALES);

  function basculerTache(id) {
    setTaches((precedentes) =>
      precedentes.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      )
    );
  }

  function supprimerTache(id) {
    setTaches((precedentes) => precedentes.filter((tache) => tache.id !== id));
  }

  return (
    <div className="app">
      <Entete titre={TITRE} sousTitre={SOUS_TITRE} />
      <Carte titre="Compteur">
        <Compteur />
      </Carte>
      <Carte titre="Ma liste">
        <ListeTaches
          taches={taches}
          onBasculer={basculerTache}
          onSupprimer={supprimerTache}
        />
      </Carte>
      <Pied auteur={AUTEUR} />
    </div>
  );
}

export default App;
