import { useContext } from "react";
import {
  QuizContext,
  QuestionBasicType,
} from "../store/QuizContextProvider.tsx";
import quizCompleteImg from "../assets/quiz-complete.png";
// @ts-expect-error this is just a file with questions
import loadedQuestions from "../assets/questions.js";

export default function Results() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }
  const answers = context.quiz.answers;
  const originalQuestions: QuestionBasicType[] = loadedQuestions;
  const score = answers.reduce(
    (total, current) =>
      current.answer ===
      originalQuestions.find((question) => question.id === current.questionId)!
        .answers[0]
        ? total + 1
        : total,
    0,
  );

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Your score: {score}</h2>
      <button onClick={() => context.dispatch({ type: "RESET" })}>
        Try again
      </button>
    </div>
  );
}
