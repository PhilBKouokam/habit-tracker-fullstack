import { useState, useEffect } from 'react'
import { Link, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { CompleteList } from "./pages/CompleteList.jsx"
import { UncompleteList } from "./pages/UncompleteList"
import './App.css'

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
      async function loadHabits() {
        try {
          const res = await fetch("http://localhost:4500/habits");
          const data = await res.json();
          setHabits(data);
        } catch (err) {
          console.log("Failed to load habits", err);
        }
      }
      
      loadHabits();
  }, []);

  return (
    <>
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/completed">Completed</Link> | {" "}
        <Link to="/uncomplete">Uncomplete</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home habits={habits} setHabits={setHabits} />} />
        <Route path="/completed" element={<CompleteList habits={habits} />} />
        <Route path="/uncomplete" element={<UncompleteList habits={habits} />} />
      </Routes>
    </>
  )
}

export default App
