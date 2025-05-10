import React from "react";

function Header({ score, total, timer, onStart, started, gameOver, onCancel }) {
    return (
        <header className="header">
            <button onClick={onStart} disabled={started && !gameOver}>
                {started ? "Quiz Running" : "Play Quiz"}
            </button>
            {started && !gameOver && (
                <button onClick={onCancel} style={{ marginLeft: 12, background: '#444', color: '#fff' }}>Cancel</button>
            )}
            <span className="score">Score: {score}/{total}</span>
            <span className="timer">
                Timer: {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
            </span>
        </header>
    );
}

export default Header;
