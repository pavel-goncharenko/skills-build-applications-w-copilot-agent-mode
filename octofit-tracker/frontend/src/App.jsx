import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [['activities', 'Activities'], ['leaderboard', 'Leaderboard'], ['teams', 'Teams'], ['users', 'Athletes'], ['workouts', 'Workouts']]

export default function App() {
  return <BrowserRouter><main className="app-shell">
    <header className="app-header">
      <div><img src={logo} alt="" width="64" height="64" /><p className="eyebrow">Mergington High School</p><h1>OctoFit Tracker</h1><p className="muted">Move together. Grow stronger.</p></div>
      <nav className="nav nav-pills" aria-label="Main navigation">{navigation.map(([path, label]) => <NavLink className="nav-link" to={`/${path}`} key={path}>{label}</NavLink>)}</nav>
    </header>
    <Routes>
      <Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} />
      <Route path="*" element={<Navigate to="/activities" replace />} />
    </Routes>
  </main></BrowserRouter>
}