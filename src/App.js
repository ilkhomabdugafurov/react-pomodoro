import React, { useState, useRef } from "react";
import "./App.css";

const padTime = (time) => {
    return time.toString().padStart(2, "0");
};

const App = () => {
    const [title, setTitle] = useState("Let the countdown begin!!!");
    const [timeLeft, setTimeLeft] = useState(15);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (intervalRef.current !== null) return;

        setTitle("You're doing great!");
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTimeLeft((timeLeft) => {
                if (timeLeft >= 1) return timeLeft - 1;
                resetTimer();
                return 0;
            });
        }, 1000);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTitle("Ready to go another round?");
        setTimeLeft(25 * 60);
        setIsRunning(false);
    };

    const stopTimer = () => {
        if (intervalRef.current === null) return;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTitle("Keep it up!");
        setIsRunning(false);
    };

    const minutes = padTime(Math.floor(timeLeft / 60));
    const seconds = padTime(timeLeft - minutes * 60);

    return (
        <div className="app">
            <h2>{title}</h2>

            <div className="timer">
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>

            <div className="buttons">
                {!isRunning ? (
                    <button onClick={startTimer}>Start</button>
                ) : (
                    <button onClick={stopTimer}>Stop</button>
                )}
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default App;
