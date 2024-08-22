import { useContext } from "react";
import { QuizContext } from "../store/QuizContextProvider.tsx";
import LandingPage from "./LandingPage.tsx";
import Question from "./Question.tsx";
import Results from "./Results.tsx";
export default function Quiz() {
  const context = useContext(QuizContext);
  let page = <></>;
  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }
  if (context.quiz.phase === "LANDING") page = <LandingPage />;
  if (context.quiz.phase === "QUIZ") page = <Question />;
  if (context.quiz.phase === "RESULTS") page = <Results />;
  return <div id="quiz">{page}</div>;
}
