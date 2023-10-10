import { useState, useEffect } from 'react';

export function useTimer(duration: number) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const manageTimer = () => {
      if (timer > 0) {
        const id = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);

        return id;
      }

      return null;
    };

    const intervalId = manageTimer();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer]);

  const startTimer = () => {
    setTimer(duration);
  };

  return { timer, startTimer };
}