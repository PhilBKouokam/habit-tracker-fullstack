import { useState, useEffect, useContext } from 'react'
import { Link, Route, Routes, Navigate } from "react-router-dom"
import { AuthContext } from './context/AuthContext.jsx'

import { Home } from "./pages/Home"
import { CompleteList } from "./pages/CompleteList.jsx"
import { UncompleteList } from "./pages/UncompleteList"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

import './App.css'
import { apiFetch } from './utils/api.js'

function App() {
  const { user, loading, logout } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);

  // Only load habits if user is logged in
  useEffect(() => {
    if (!user) return;

    async function loadHabits() {
      try {
        const res = await apiFetch("/api/habits", {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        });
        const data = await res.json();
        setHabits(data);
      } catch (err) {
        console.log("Failed to load habits", err);
      }
    }
      
    loadHabits();
  }, [user]);

  if (loading) {
    return <div className='text-center mt-5'>Loading...</div>
  }

  return (
    <>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4'>
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">HabitTracker</Link>

            <button
              className="navbar-toggler"
              type='button'
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/completed">Completed</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/uncomplete">Uncomplete</Link>
                    </li>
                    <li className='nav-item'>
                      <button
                        className='nav-link btn btn-link text-danger'
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='nav-item'>
                      <Link className='nav-link' to="/login">Login</Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-link' to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={user ? <Home habits={habits} setHabits={setHabits} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/completed" 
            element={user ? <CompleteList habits={habits} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/uncomplete" 
            element={user ? <UncompleteList habits={habits} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </>
  );
}

export default App
