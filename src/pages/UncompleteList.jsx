import { Link } from "react-router-dom"

function UncompleteList({ habits }) {
    const uncompleteHabits = habits.filter(habit => habit.completed === false);
    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h2 className="text-center text-warning mb-4">Habits Yet To Complete</h2>

                {uncompleteHabits.length === 0 && habits.length > 0 && (
                    <p className="text-center text-muted">
                        All habits completed! 🎉
                    </p>
                )}

                {habits.length === 0 && (
                    <p className="text-center text-muted">
                        No habits yet! Please add habits to get started.
                    </p>
                )}

                {uncompleteHabits.length > 0 && (
                    <ul className="list-group">
                        {uncompleteHabits.map(habit => (
                            <li 
                                key={habit._id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <span style={{ fontWeight: "500" }}>
                                    {habit.habitName}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="text-center mt-4">
                    <Link to="/" className="btn btn-outline-secondary">
                        ⬅ Back
                    </Link>
                </div>
            </div>
        </div>
    )
}

export { UncompleteList }