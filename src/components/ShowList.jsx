function ShowList({ habits, setHabits }) {
    async function deleteHabit(id) {
        const res = await fetch(`http://localhost:4500/habits/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            console.error("Failed to delete habit");
            return;
        }

        const deleted = await res.json();
        
        if (deleted) {
            setHabits(prev => prev.filter(habit => habit._id !== id));
        }
    }

    async function markComplete(id) {
        const res = await fetch(`http://localhost:4500/habits/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: true, dateCompleted: new Date().toISOString() })
        })

        if (!res.ok) {
            console.log("Failed to update habit");
            return;
        }

        const updatedHabit = await res.json();
        console.log("Updating habit...");
        setHabits(prev => prev.map(habit => 
            habit._id === updatedHabit._id ? updatedHabit : habit
        ));
    }

    async function markUncomplete(id) {
        const res = await fetch(`http://localhost:4500/habits/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: false, dateCompleted: null })
        })

        if (!res.ok) {
            console.log("Failed to update habit");
            return;
        }

        const updatedHabit = await res.json();
        console.log("Updating habit...");
        setHabits(prev =>
            prev.map(habit =>
                habit._id === updatedHabit._id 
                    ? updatedHabit 
                    : habit
            )
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="mb-4 text-center">Your Habits</h2>
                {(!habits || habits.length === 0) && <p className="text-muted text-center">No habits yet. Start building one 🚀</p>}
                {habits.length > 0 && <ul className="list-group">
                    {habits.map(habit => <li key={habit._id} className="list-group-item"><span style={{ 
                        textDecoration: habit.completed ? "line-through" : "none",
                        fontWeight: "500"
                        }}
                        >
                            {habit.habitName}
                        </span>
                        <div className="d-flex gap-2">
                            <button 
                                className="btn btn-danger btn-sm me-2" 
                                onClick={() => deleteHabit(habit._id)}
                            >
                                Delete Habit
                            </button>
                            <button 
                                className={`btn btn-sm ${habit.completed ? "btn-warning" : "btn-success"}`}
                                onClick={() => 
                                    habit.completed 
                                        ? markUncomplete(habit._id) 
                                        : markComplete(habit._id)
                                }
                            >
                                {habit.completed ? "Undo" : "Complete"}
                            </button>
                        </div>
                    </li>)}
                </ul>}
            </div>
        </div>
    )
}

export { ShowList }