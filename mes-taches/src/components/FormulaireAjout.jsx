import { useState } from 'react'

function FormulaireAjout({ onAjouter }) {
    const [titre, setTitre] = useState('')

    function gererSoumission(event) {
    event.preventDefault()
    // À compléter :
    // - ignorer un titre vide ou composé uniquement d'espaces (trim)
    // - appeler onAjouter avec le titre nettoyé
    // - vider le champ
    if (titre.trim() !== '') {
      onAjouter(titre.trim())
      setTitre('')
    }
    }

    return (
    <form className="formulaire" onSubmit={gererSoumission}>
        <input
        type="text"
        value={titre}
        onChange={(event) => setTitre(event.target.value)}
        placeholder="Ex. : Réviser les hooks"
        />
        <button type="submit" className="principal">Ajouter</button>
    </form>
    )
}

export default FormulaireAjout