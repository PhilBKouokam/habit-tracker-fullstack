import { useContext, useState } from "react"
import { apiFetch } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

function AddHabit({ habits, setHabits }) {
    const { user } = useContext(AuthContext);

    const [habitName, setHabitName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
 
    async function handleAddHabit() {
        setError("");
        setSuccess("");
        setLoading(true);

        if (!user || !user.id) {
            setError("You must be logged in to add habits");
            setTimeout(() => {
                setError("")
            }, 2000);
            setLoading(false);
            return;
        }

        if (!habitName.trim()) {
            setLoading(false);
            setError("Please enter a valid habit!");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        } 

        const exists = habits.find(h => h.habitName === habitName.trim());
        if (exists) {
            setLoading(false);
            setError("Habit already exists! Please enter a new habit.");
            setTimeout(() => {
                setError("");
            }, 2000)
            return;
        } 

        const habit = {
            habitName: habitName.trim(),
            completed: false,
            dateAdded: new Date().toISOString(),
            dateCompleted: null,
            user: user.id // <- Send the logged-in user ID
        };

        try {
            const res = await apiFetch("http://localhost:4500/api/habits", {
                method: "POST",
                body: JSON.stringify(habit)
            });

            if (!res.ok) {
                const err = await res.json();
                setError(err.error || "Failed to add habit");
                setTimeout(() => {
                    setError("");
                }, 2000)
                return;
            }

            const added = await res.json();
            setHabits(prev => [...prev, added]);
            setHabitName("");
            setSuccess("Habit added successfully! ✅");
            setTimeout(() => {
                setSuccess("");
            }, 2000);

        } catch (err) {
            console.error("Add habit error:", err);
            setError("Network error. Please try again.");
            setTimeout(() => setError(""), 2000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm">
                <h4 className="mb-3 text-center">Add a New Habit</h4>

                <div className="d-flex gap-2">
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Enter a habit"
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                        disabled={loading}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={handleAddHabit}
                        disabled={loading}
                    >
                        {loading ? "Adding Habit..." : "Add"}
                    </button>
                </div>

                {error && (
                    <p className="text-danger mt-2 text-center">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="text-success text-center mt-2">
                        {success}
                    </p>
                )}
            </div>
        </div>  
    )
}

export { AddHabit }