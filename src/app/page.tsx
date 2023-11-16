"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
    const [isActive, setIsActive] = useState(false);
    const [inputTime, setInputTime] = useState(60); // Input field for setting time

    const startTimer = () => {
        setTimeLeft(inputTime);
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
        const audio = document.getElementById(
            "timer-sound"
        ) as HTMLAudioElement;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    };

    const resetTimer = () => {
        setTimeLeft(inputTime);
        setIsActive(false);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            const audio = document.getElementById(
                "timer-sound"
            ) as HTMLAudioElement;
            audio && audio.play();
            setIsActive(false);
        }

        return () => clearInterval(interval!);
    }, [isActive, timeLeft]);

    const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setInputTime(Math.max(0, Number(event.target.value)));
    };

    return (
        <main className={styles.main}>
            <h1>Workout Timer</h1>
            <input
                type="number"
                value={inputTime}
                onChange={handleTimeChange}
                className={styles.timeInput}
            />
            <div className={styles.timeLeft}>Time Left: {timeLeft}s</div>
            <button className={styles.button} onClick={startTimer}>
                Start
            </button>
            <button className={styles.button} onClick={stopTimer}>
                Stop
            </button>
            <button className={styles.button} onClick={resetTimer}>
                Reset
            </button>
            <audio id="timer-sound" src="/alarm.mp3" preload="auto"></audio>
        </main>
    );
}
