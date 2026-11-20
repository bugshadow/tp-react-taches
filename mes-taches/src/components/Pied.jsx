const ANNE =new Date().getFullYear();

function Pied({auteur}){
    return (
        <footer className="pied">
            <p>TP React - realise par {auteur} - {ANNE}</p>
        </footer>
    )
}

export default Pied;