import {
  useCallback,
  useContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  MutableRefObject,
} from "react";
import { QuizContext } from "../store/QuizContextProvider.tsx";

export type TimerHandle = {
  stop: () => void;
};

const Timer = forwardRef<TimerHandle>(function Timer(_props, ref) {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }
  const maxTime = context.quiz.timeout;
  const [remainingTime, setRemainingTime] = useState<number>(maxTime);
  const interval = 20;

  const timeoutRef = useRef<number>(null) as MutableRefObject<number>;
  const intervalRef = useRef<number>(null) as MutableRefObject<number>;

  useImperativeHandle(ref, () => ({
    stop() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
  }));

  const onTimeout = useCallback(
    function onTimeout() {
      context!.dispatch({ type: "ANSWER", text: "timeout" });
    },
    [context],
  );

  useEffect(() => {
    timeoutRef.current = setTimeout(onTimeout, maxTime);
    return () => clearTimeout(timeoutRef.current);
  }, [onTimeout, maxTime]);

  useEffect(() => {
    setRemainingTime(maxTime);
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - interval);
    }, interval);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [context]);

  return (
    <progress
      max={maxTime}
      value={maxTime - remainingTime}
      id="question-time"
    />
  );
});

export default Timer;
