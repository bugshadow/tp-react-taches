function Entete({Titre,sousTitre}) {
    return (
        <header className="entete">
            <h1>{Titre}</h1>
            <p>{sousTitre}</p>
        </header>
    )
}
export default Entete;