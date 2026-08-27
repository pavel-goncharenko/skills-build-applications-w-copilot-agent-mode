import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceView } from './ResourceState.jsx'

export default function Leaderboard() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` : undefined
  const [items, setItems] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('leaderboard', endpoint).then(setItems).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [endpoint])
  return <ResourceView title="Leaderboard" description="Ranked OctoFit athletes by challenge score." component="leaderboard" {...state}>
    {items.length === 0 && !state.error ? <p className="state-message">No leaderboard entries are available yet.</p> : <div className="row g-3">{items.map((item, index) => <article className="col-md-6 col-xl-4" key={item._id || index}><div className="data-card h-100"><span className="score">{item.score}</span><h3>#{index + 1} {item.user?.displayName || item.user?.username || 'Unknown athlete'}</h3><p className="muted">{item.team?.name || 'Independent'}</p></div></article>)}</div>}
  </ResourceView>
}