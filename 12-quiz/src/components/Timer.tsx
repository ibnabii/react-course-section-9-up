import { useContext, useEffect, useRef, useState } from "react";
import { QuizContext } from "../store/QuizContextProvider.tsx";

export default function Timer() {
  const context = useContext(QuizContext);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const interval = 20;
  const timedout = useRef<boolean>(false);
  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }
  function onTimeout() {
    context!.dispatch({ type: "ANSWER", id: 999 });
    timedout.current = true;
  }

  useEffect(() => {
    timedout.current = false;
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => {
        const newTime = prevTime + interval;
        if (newTime >= context.quiz.timeout) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return newTime;
      });
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, [onTimeout]);
  const maxTime = context.quiz.timeout;

  return <progress max={maxTime} value={elapsedTime}></progress>;
}
