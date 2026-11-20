function Tache({ titre, terminee }){
    const symbole = terminee ? "✅" : "⬜";
    const classe = terminee ? "tache terminee" : "tache";
    return (
        <li className={classe}>
            {symbole} {titre}
        </li>
    )
} 

export default Tache;