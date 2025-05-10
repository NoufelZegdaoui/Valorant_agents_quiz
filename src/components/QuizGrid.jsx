import React from "react";

function QuizGrid({ agents, guessed }) {
    return (
        <div className="grid">
            {agents.map(agent => (
                <div key={agent} className="agent-slot">
                    {guessed.includes(agent.toLowerCase()) ? agent : ""}
                </div>
            ))}
        </div>
    );
}

export default QuizGrid;