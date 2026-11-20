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
const CLE_STOCKAGE = "mes-taches";

function lireTachesSauvegardees() {
  try {
    const donnees = localStorage.getItem(CLE_STOCKAGE);
    return donnees === null ? null : JSON.parse(donnees);
  } catch {
    return null;
  }
}

function App() {
  const [taches, setTaches] = useState(() => lireTachesSauvegardees() ?? []);
  const [filtre, setFiltre] = useState("toutes");
  const [chargement, setChargement] = useState(
    () => lireTachesSauvegardees() === null
  );
  const [erreur, setErreur] = useState(null);
  const [horlogeVisible, setHorlogeVisible] = useState(true);

  useEffect(() => {
    // Si des tâches sont déjà enregistrées dans le navigateur,
    // on ne recharge pas le fichier JSON.
    if (lireTachesSauvegardees() !== null) return;

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

  // Sauvegarde automatique dans localStorage à chaque modification.
  useEffect(() => {
    if (chargement || erreur) return;
    try {
      localStorage.setItem(CLE_STOCKAGE, JSON.stringify(taches));
    } catch {
      // Stockage indisponible (mode privé, quota…) : on ignore.
    }
  }, [taches, chargement, erreur]);

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

  function modifierTache(id, nouveauTitre) {
    setTaches((precedentes) =>
      precedentes.map((tache) =>
        tache.id === id ? { ...tache, titre: nouveauTitre } : tache
      )
    );
  }

  function supprimerTerminees() {
    setTaches((precedentes) =>
      precedentes.filter((tache) => !tache.terminee)
    );
  }

  const terminees = taches.filter((tache) => tache.terminee).length;

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
        <div className="ligne">
          <button onClick={() => setHorlogeVisible(!horlogeVisible)}>
            {horlogeVisible ? "Masquer l'horloge" : "Afficher l'horloge"}
          </button>
        </div>
        {horlogeVisible && <Horloge />}
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
            onModifier={modifierTache}
          />
        )}
        <div className="ligne" style={{ marginTop: "12px" }}>
          <button
            className="danger"
            onClick={supprimerTerminees}
            disabled={terminees === 0}
          >
            Supprimer les tâches terminées
          </button>
        </div>
      </Carte>
      <Carte titre="Statistiques">
        <Statistiques taches={taches} />
      </Carte>
      <Pied auteur={AUTEUR} />
    </div>
  );
}

export default App;
