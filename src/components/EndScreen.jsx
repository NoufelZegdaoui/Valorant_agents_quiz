import React from "react";

function formatTime(seconds) {
    const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
}

function EndScreen({ score, total, missedAgents, onRestart, timeTaken }) {
    const allCorrect = missedAgents.length === 0;
    return (
        <div className="end-screen">
            <h2>{allCorrect ? "🎉 Congratulations! 🎉" : "Quiz Over!"}</h2>
            <p>Your Score: <b>{score} / {total}</b></p>
            <p>Time Taken: <b>{formatTime(timeTaken)}</b></p>
            {allCorrect && <p>You've named all Valorant agents!</p>}
            {!allCorrect && missedAgents.length > 0 && (
                <div>
                    <h3>Missed Agents:</h3>
                    <ul>
                        {missedAgents.map(agent => (
                            <li key={agent}>{agent}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={onRestart}>Retry</button>
        </div>
    );
}

export default EndScreen;
