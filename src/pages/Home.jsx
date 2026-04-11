import { useState } from "react";
import { AddHabit } from "../components/AddHabit"
import { ShowList } from "../components/ShowList"

function Home({ habits, setHabits}) {
    const [showList, setShowList] = useState(false);

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm mb-4">
                <h2 className="text-center mb-4">Habit Tracker</h2>

                <AddHabit habits={habits} setHabits={setHabits} />

                <div className="text-center mt-4 mb-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowList(prev => !prev)}
                    >
                        {showList ? "Hide List" : "Show List"}
                    </button>
                </div>

                {showList && (
                    <ShowList habits={habits} setHabits={setHabits} />
                )}
            </div>
        </div>
    );
}

export { Home }