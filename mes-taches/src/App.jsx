import Entete from "./components/Entete";
import Pied from "./components/Pied";
import ListeTaches from "./components/ListeTaches";

function App(){
    return (
        <div className="app">
            <Entete />
            <section className="carte">
                <h2>Ma Liste</h2>
                <ListeTaches />
            </section>
            <Pied />
        </div>
    )
}

export default App;