import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#f4f4f4' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Welcome to GitHub User Search</h2>} />
        <Route path="/profile" element={<h2>User Profile Page</h2>} />
      </Routes>
    </div>
  )
}

export default App
