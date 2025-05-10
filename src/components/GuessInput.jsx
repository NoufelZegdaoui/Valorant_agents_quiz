import React from "react";

function GuessInput({ value, onChange, onGuess, disabled }) {
    return (
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onGuess()}
            placeholder="Type agent name..."
            disabled={disabled}
            className="guess-input"
        />
    );
}

export default GuessInput;