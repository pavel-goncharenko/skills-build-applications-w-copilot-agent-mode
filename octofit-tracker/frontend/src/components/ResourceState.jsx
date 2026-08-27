export function ResourceState({ loading, error, children }) {
  if (loading) return <p className="state-message">Loading...</p>
  if (error) return <p className="alert alert-warning">{error}</p>
  return children
}

export function ResourceView({ title, description, component, loading, error, children }) {
  return <section className="content-panel"><div className="panel-heading"><p className="eyebrow">{component}</p><h2>{title}</h2><p className="muted">{description}</p></div><ResourceState loading={loading} error={error}>{children}</ResourceState></section>
}