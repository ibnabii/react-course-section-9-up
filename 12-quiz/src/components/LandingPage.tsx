import { useContext } from "react";
import { QuizContext } from "../store/QuizContextProvider.tsx";

export default function LandingPage() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }

  const { dispatch } = context;

  return (
    <header>
      <h1>Ready to start the quiz?</h1>
      <button onClick={() => dispatch({ type: "RESET" })}>GO</button>
    </header>
  );
}
