import { Link } from "react-router-dom"

function CompleteList({ habits }) {
    const completeHabits = habits.filter(habit => habit.completed === true);

    return(
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h2 className="text-center text-success mb-4">Completed Habits ✅</h2>

                {completeHabits.length === 0 && (
                    <p className="text-muted text-center">
                        No habits completed yet
                    </p>
                )}

                {completeHabits.length > 0 && (
                    <ul className="list-group">
                        {completeHabits.map(habit => (
                            <li
                                key={habit._id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <span style={{ textDecoration: "line-through", fontWeight: "500" }}>
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

export { CompleteList }