function Carte({ titre, children }) {
    return (
    <section className="carte">
        <h2>{titre}</h2>
        <p>{children}</p>
    </section>
    )
}

export default Carte