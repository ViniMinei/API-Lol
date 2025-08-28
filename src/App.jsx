import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Champ from './champ.jsx'
import './App.css'

function Home() {
  const [player, setPlayer] = useState({})
  const [gameName, setGameName] = useState('')
  const [tagLine, setTagLine] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')

  const generatePlayer = () => {
    setError('') 
    fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${encodeURIComponent(apiKey)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.status.status_code === 404) {
          setPlayer({})
          setError('Erro, jogador não encontrado')
        } else {
          setPlayer(data)
          setError('')
        }
      })
      .catch(() => {
        setPlayer({})
        setError('Erro ao buscar jogador')
      })
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <h1>Veja sua conta</h1>
      <div>
        <div>
          <label htmlFor="apiKey">Digite sua API:</label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gameName">Seu nome:</label>
          <input
            id="gameName"
            type="text"
            value={gameName}
            onChange={e => setGameName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tagLine">Sua tag:</label>
          <input
            id="tagLine"
            type="text"
            value={tagLine}
            onChange={e => setTagLine(e.target.value)}
          />
        </div>
        <div>
          <button onClick={generatePlayer}>Buscar Jogador</button>
        </div>
        {error && <div id='error'>{error}</div>}
        <div>{player.tagLine}</div>
        <div>{player.gameName}</div>
        <div><Link to="/champ">campeão</Link></div>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champ" element={<Champ />} />
      </Routes>
    </Router>
  )
}

export default App