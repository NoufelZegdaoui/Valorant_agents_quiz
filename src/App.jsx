import React, { useState, useEffect, useRef } from "react";
import { agents } from "./agents";
import Header from "./components/Header";
import QuizGrid from "./components/QuizGrid";
import GuessInput from "./components/GuessInput";
import EndScreen from "./components/EndScreen";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [guessed, setGuessed] = useState([]);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(540); // 9 minutes in seconds
  const [gameOver, setGameOver] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef();

  // Start/stop timer
  useEffect(() => {
    if (started && !gameOver) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameOver(true);
            setStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [started, gameOver]);

  // End game if all agents are guessed
  useEffect(() => {
    if (score === agents.length && started) {
      setGameOver(true);
      setStarted(false);
      clearInterval(timerRef.current);
      setTimeTaken(540 - timer);
    }
  }, [score, started, timer]);

  // If time runs out and not all agents are guessed
  useEffect(() => {
    if (!started && gameOver && score !== agents.length) {
      setTimeTaken(540 - timer);
    }
  }, [gameOver, started, score, timer]);

  const handleStart = () => {
    setStarted(true);
    setScore(0);
    setGuessed([]);
    setInput("");
    setTimer(540);
    setGameOver(false);
    setTimeTaken(0);
  };

  const handleCancel = () => {
    setStarted(false);
    setScore(0);
    setGuessed([]);
    setInput("");
    setTimer(540);
    setGameOver(false);
    setTimeTaken(0);
    clearInterval(timerRef.current);
  };

  const handleGuess = () => {
    const guess = input.trim();
    const match = agents.find(
      (agent) => agent.toLowerCase() === guess.toLowerCase()
    );
    if (match && !guessed.includes(match.toLowerCase())) {
      setGuessed([...guessed, match.toLowerCase()]);
      setScore(score + 1);
    }
    setInput("");
  };

  const missedAgents = agents.filter(
    (agent) => !guessed.includes(agent.toLowerCase())
  );

  return (
    <div className="App">
      <h1 className="main-title">VALORANT PLAYABLE AGENTS</h1>
      <Header
        score={score}
        total={agents.length}
        timer={timer}
        onStart={handleStart}
        started={started}
        gameOver={gameOver}
        onCancel={handleCancel}
      />
      {started && !gameOver && (
        <>
          <GuessInput
            value={input}
            onChange={setInput}
            onGuess={handleGuess}
            disabled={gameOver}
          />
          <QuizGrid agents={agents} guessed={guessed} />
        </>
      )}
      {gameOver && (
        <EndScreen
          score={score}
          total={agents.length}
          missedAgents={missedAgents}
          onRestart={handleStart}
          timeTaken={timeTaken}
        />
      )}
    </div>
  );
}

export default App;