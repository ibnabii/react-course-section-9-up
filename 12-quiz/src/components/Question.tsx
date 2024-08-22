import { useContext } from "react";
import { QuizContext } from "../store/QuizContextProvider.tsx";
import Timer from "./Timer.tsx";

export default function Question() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }
  const question = context.quiz.currentQuestion;
  if (!question) throw new Error("Error reading question");
  return (
    <>
      <div id="question">
        <h2>{question.text}</h2>
        <Timer />
      </div>
      <ul id="answers">
        {question.answers.map((answer, id) => (
          <li className="answer" key={id}>
            <button
              onClick={() => context.dispatch({ type: "ANSWER", text: answer })}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
