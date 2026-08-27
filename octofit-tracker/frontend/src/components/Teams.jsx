import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceView } from './ResourceState.jsx'

export default function Teams() {
  const [items, setItems] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('teams').then(setItems).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <ResourceView title="Teams" description="Groups competing together across the OctoFit challenge board." component="teams" {...state}><div className="row g-3">{items.map((item) => <article className="col-md-6 col-xl-4" key={item._id || item.name}><div className="data-card h-100"><h3>{item.name}</h3><p className="muted">Mascot: {item.mascot || 'Not assigned'}</p><span className="metric">{item.members?.length || 0} members</span></div></article>)}</div></ResourceView>
}