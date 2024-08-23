import { useContext, useRef, useState } from "react";
import { QuizContext } from "../store/QuizContextProvider.tsx";
import Timer, { TimerHandle } from "./Timer.tsx";

type AnswerStateType = "" | "correct" | "wrong";

export default function Question() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext must be used within a QuizContextProvider");
  }
  const question = context.quiz.currentQuestion;
  if (!question) throw new Error("Error reading question");

  const [answerState, setAnswerState] = useState<AnswerStateType>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const timer = useRef<TimerHandle>(null);

  function handleSelectAnswer(selectedAnswer: string) {
    timer.current?.stop();
    setSelectedAnswer(selectedAnswer);
    setTimeout(() => {
      if (selectedAnswer === question!.correctAnswer) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }
      setTimeout(() => {
        context!.dispatch({ type: "ANSWER", text: selectedAnswer });
      }, 2000);
    }, 1000);
  }

  return (
    <>
      <div id="question">
        <h2>{question.text}</h2>
        <Timer ref={timer} />
      </div>
      <ul id="answers">
        {question.answers.map((answer, id) => {
          let cssClasses = "";
          if (selectedAnswer === answer) {
            if (answerState) cssClasses = answerState;
            else cssClasses = "selected";
          }
          return (
            <li className="answer" key={id}>
              <button
                onClick={() => handleSelectAnswer(answer)}
                className={cssClasses}
                disabled={!!selectedAnswer}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
