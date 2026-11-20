import Entete from "./components/Entete";
import Pied from "./components/Pied";
import ListeTaches from "./components/ListeTaches";
import Carte from "./components/carte";

const TACHES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: "Gérer l'état avec useState", terminee: false },
]
const TITRE = "Mes tâches";
const SOUS_TITRE = "Une simple application React pour gérer vos tâches";
const AUTEUR = "BOUHADDACH OMAR";
function App(){
    return (
        <div className="app">
            <Entete titre={TITRE} sousTitre={SOUS_TITRE} auteur={AUTEUR} />
            <Carte titre="Ma liste">
                <ListeTaches taches={TACHES} />
            </Carte>
            <Pied auteur={AUTEUR} />
        </div>
    )
}

export default App;