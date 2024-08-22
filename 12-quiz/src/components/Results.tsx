import { useContext } from "react";
import { QuizContext } from "../store/QuizContextProvider.tsx";

export default function Results() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }
  const answers = context.quiz.answers;
  const score = answers.reduce(
    (total, current) => (current.answer === 0 ? total + 1 : total),
    0,
  );

  return (
    <div id="summary">
      <h2>Your score: {score}</h2>
      <button onClick={() => context.dispatch({ type: "RESET" })}>
        Try again
      </button>
    </div>
  );
}
