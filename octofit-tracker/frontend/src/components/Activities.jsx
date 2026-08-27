import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceView } from './ResourceState.jsx'

export default function Activities() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/` : undefined
  const [items, setItems] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('activities', endpoint).then(setItems).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [endpoint])
  return <ResourceView title="Activities" description="Recent workouts, movement sessions, and calorie-burning efforts." component="activities" {...state}>
    {items.length === 0 && !state.error ? <p className="state-message">No activities are available yet.</p> : <div className="row g-3">{items.map((item) => <article className="col-md-6 col-xl-4" key={item._id || item.completedAt}><div className="data-card h-100"><h3>{item.type}</h3><p className="muted">{item.user?.displayName || item.user?.username || 'Unknown athlete'}</p><div className="stats-row"><span>{item.durationMinutes} min</span><span>{item.caloriesBurned} cal</span></div></div></article>)}</div>}
  </ResourceView>
}