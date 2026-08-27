import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceView } from './ResourceState.jsx'

export default function Workouts() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : undefined
  const [items, setItems] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('workouts', endpoint).then(setItems).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [endpoint])
  return <ResourceView title="Workouts" description="Personalized workout recommendations for different training levels." component="workouts" {...state}><div className="row g-3">{items.map((item) => <article className="col-md-6 col-xl-4" key={item._id || item.name}><div className="data-card h-100"><span className="badge text-bg-success text-capitalize">{item.difficulty}</span><h3>{item.name}</h3><p>{item.description}</p><span className="metric">{item.durationMinutes} minutes</span></div></article>)}</div></ResourceView>
}