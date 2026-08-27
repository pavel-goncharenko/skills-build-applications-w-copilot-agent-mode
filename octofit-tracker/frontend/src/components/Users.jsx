import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceView } from './ResourceState.jsx'

export default function Users() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` : undefined
  const [items, setItems] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('users', endpoint).then(setItems).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [endpoint])
  return <ResourceView title="Users" description="Member profiles connected to OctoFit teams and activity history." component="users" {...state}><div className="row g-3">{items.map((item) => <article className="col-md-6 col-xl-4" key={item._id || item.username}><div className="data-card h-100"><h3>{item.displayName || item.username}</h3><p className="muted">@{item.username}</p><p>{item.email}</p><span className="badge text-bg-light">{item.team?.name || 'Unassigned'}</span></div></article>)}</div></ResourceView>
}