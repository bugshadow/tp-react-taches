import { useEffect, useState } from 'react'

function Horloge() {
    const [maintenant, setMaintenant] = useState(() => new Date())

    useEffect(() => {
    // À compléter :
    // 1. démarrer un setInterval qui met à jour « maintenant » toutes les 1000 ms
    const intervalId = setInterval(() => {
        setMaintenant(new Date())
    }, 1000)

    // 2. retourner une fonction de nettoyage qui appelle clearInterval
    return () => {
        clearInterval(intervalId)
    }
    }, [])

    return <p className="horloge">{maintenant.toLocaleTimeString('fr-FR')}</p>
}

export default Horloge