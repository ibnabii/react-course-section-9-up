import { useCallback, useContext, useEffect, useState } from "react";
import { QuizContext } from "../store/QuizContextProvider.tsx";

export default function Timer() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }
  const maxTime = context.quiz.timeout;
  const [remainingTime, setRemainingTime] = useState<number>(maxTime);
  const interval = 20;

  const onTimeout = useCallback(
    function onTimeout() {
      context!.dispatch({ type: "ANSWER", text: "timeout" });
    },
    [context],
  );

  useEffect(() => {
    const timeoutTimer = setTimeout(onTimeout, maxTime);
    return () => clearTimeout(timeoutTimer);
  }, [onTimeout, maxTime]);

  useEffect(() => {
    setRemainingTime(maxTime);
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - interval);
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, [context]);

  return (
    <progress
      max={maxTime}
      value={maxTime - remainingTime}
      id="question-time"
    />
  );
}
