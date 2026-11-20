import { useEffect, useState } from "react";
import Entete from "./components/Entete";
import Pied from "./components/Pied";
import ListeTaches from "./components/ListeTaches";
import Carte from "./components/carte.jsx";
import Compteur from "./components/Compteur";
import Formulaire from "./components/Formulaire";
import Filtres from "./components/Filtres";
import Statistiques from "./components/Statistiques";
import Horloge from "./components/Horloge";

const TITRE = "Mes tâches";
const SOUS_TITRE = "Mon premier projet React";
const AUTEUR = "BOUHADDACH OMAR";

function App() {
  const [taches, setTaches] = useState([]);
  const [filtre, setFiltre] = useState("toutes");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    let annule = false;

    fetch("/taches.json")
      .then((reponse) => {
        if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
        return reponse.json();
      })
      .then((donnees) => {
        if (!annule) setTaches(donnees);
      })
      .catch((err) => {
        if (!annule) setErreur(err.message);
      })
      .finally(() => {
        if (!annule) setChargement(false);
      });

    return () => {
      annule = true;
    };
  }, []);

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

  function ajouterTache(titre) {
    setTaches((precedentes) => [
      ...precedentes,
      { id: Date.now(), titre, terminee: false },
    ]);
  }

  const tachesVisibles = taches.filter((tache) => {
    if (filtre === "actives") return !tache.terminee;
    if (filtre === "terminees") return tache.terminee;
    return true;
  });

  const restantes = taches.filter((tache) => !tache.terminee).length;

  useEffect(() => {
    document.title = `(${restantes}) ${TITRE}`;
  }, [restantes]);

  return (
    <div className="app">
      <Entete titre={TITRE} sousTitre={SOUS_TITRE} />
      <Carte titre="Compteur">
        <Compteur />
      </Carte>
      <Carte titre="Heure actuelle">
        <Horloge />
      </Carte>
      <Carte titre="Nouvelle tâche">
        <Formulaire onAjouter={ajouterTache} />
      </Carte>
      <Carte titre="Ma liste">
        <Filtres filtre={filtre} onChanger={setFiltre} />
        {chargement ? (
          <p className="vide">Chargement des tâches…</p>
        ) : erreur ? (
          <p className="erreur">Impossible de charger les tâches : {erreur}</p>
        ) : (
          <ListeTaches
            taches={tachesVisibles}
            onBasculer={basculerTache}
            onSupprimer={supprimerTache}
          />
        )}
      </Carte>
      <Carte titre="Statistiques">
        <Statistiques taches={taches} />
      </Carte>
      <Pied auteur={AUTEUR} />
    </div>
  );
}

export default App;
