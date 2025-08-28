import { useState } from 'react'
import { Link } from 'react-router-dom'

function Champ() {
    const [champ, setChamp] = useState(null)
    const [error, setError] = useState('')
    const [champName, setChampName] = useState('')

    const generateChamp = () => {
        setError('')
        setChamp(null)
        fetch(`https://ddragon.leagueoflegends.com/cdn/15.17.1/data/pt_BR/champion/${encodeURIComponent(champName)}.json`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status && data.status.status_code === 404) {
                    setChamp(null)
                    setError('Erro, Campeão não encontrado')
                } else {
                    const champData = data.data && data.data[champName]
                    if (champData) {
                        setChamp(champData)
                        setError('')
                    } else {
                        setChamp(null)
                        setError('Erro, Campeão não encontrado')
                    }
                }
            })
            .catch(() => {
                setChamp(null)
                setError('Erro ao buscar Campeão')
            })
    }

    return (
        <>
            <h1>Buscar Campeão</h1>
            <div>
                <label htmlFor="champName">nome do campeão: </label>
                <input
                    id="champName"
                    type="text"
                    value={champName}
                    onChange={e => setChampName(e.target.value)}
                />
            </div>
            <div>
                <button onClick={generateChamp}>Buscar Campeão</button>
            </div>
            <div>
                <Link to="/">Home</Link>
            </div>
            {error && <div id="error">{error}</div>}
            {champ && (
                <div>
                    <h2>{champ.name}</h2>
                    <h3>{champ.title}</h3>
                    <p>{champ.lore}</p>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${champ.image.full}`}
                        alt={champ.name}
                        width={120}
                    />
                </div>
            )}
        </>
    )
}



export default Champ