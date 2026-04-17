import { useState } from "react";
import { apiFetch } from "../utils/api";

function ShowList({ habits, setHabits }) {
    const [loadingId, setLoadingId] = useState(null);

    async function deleteHabit(id) {
        if (!window.confirm("Are you sure you want to delete this habit?")) return;

        setLoadingId(id);
        try {
            const res = await apiFetch(`/api/habits/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                throw new Error("Failed to delete");
            }

            const deleted = await res.json();
            
            if (deleted) {
                setHabits(prev => prev.filter(habit => habit._id !== id));
            }
        } catch (err) {
            alert("Failed to delete habit. Please try again.");
        } finally {
            setLoadingId(null);
        }
    }

    async function toggleComplete(id, currentStatus) {
        setLoadingId(id);
        try {
            const res = await apiFetch(`http://localhost:4500/api/habits/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ 
                    completed: !currentStatus,
                    dateCompleted: !currentStatus ? new Date().toISOString() : null
                })
            });

            if (!res.ok) throw new Error("Failed to update");

            const updatedHabit = await res.json();

            setHabits(prev => 
                prev.map(habit =>
                    habit._id === updatedHabit._id ? updatedHabit : habit
                )
            );
        } catch (err) {
            alert("failed to update habit. Please try again.");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="mb-4 text-center">Your Habits</h2>

                {(!habits || habits.length === 0) && (
                    <p className="text-muted text-center fs-5 py-5">
                        No habits yet. Start building one 🚀
                    </p>
                )}

                {habits.length > 0 && (
                    <ul className="list-group list-group-flush">
                        {habits.map(habit => (
                            <li key={habit._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                <span 
                                    style={{ 
                                        textDecoration: habit.completed ? "line-through" : "none",
                                        fontWeight: "500",
                                        fontSize: "1.1rem"
                                    }}
                                >
                                    {habit.habitName}
                                </span>

                                <div className="d-flex gap-2">
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => deleteHabit(habit._id)}
                                        disabled={loadingId === habit._id}
                                    >
                                        {loadingId === habit._id ? "Deleting..." : "Delete"}
                                    </button>

                                    <button 
                                        className={`btn btn-sm ${habit.completed ? "btn-warning" : "btn-success"}`}
                                        onClick={() => toggleComplete(habit._id, habit.completed)}
                                        disabled={loadingId === habit._id}
                                    >
                                        {loadingId === habit._id
                                            ? "Updating..."
                                            : habit.completed ? "Undo" : "Complete"
                                        }
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export { ShowList };