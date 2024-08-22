import {
  createContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";

// @ts-expect-error this is just a file with questions
import loadedQuestions from "../assets/questions.js";

type QuestionType = {
  id: string;
  text: string;
  answers: string[];
};

type AnswerType = {
  questionId: string;
  answer: number;
};

type PhaseType = "LANDING" | "QUIZ" | "RESULTS";

type QuizStateType = {
  questions: QuestionType[];
  answers: AnswerType[];
  currentQuestion: QuestionType | null;
  phase: PhaseType;
  timeout: number;
};

const initialQuizState: QuizStateType = {
  questions: [],
  currentQuestion: null,
  answers: [],
  phase: "LANDING",
  timeout: 5 * 1000,
};

type ResetAction = {
  type: "RESET";
};

type AnswerAction = {
  type: "ANSWER";
  id: number;
};

type ActionType = ResetAction | AnswerAction;

function quizReducer(state: QuizStateType, action: ActionType): QuizStateType {
  function nextQuestion(list: QuestionType[]) {
    if (!list.length) return null;
    const randomIndex = Math.floor(Math.random() * list.length);
    const [question] = list.splice(randomIndex, 1);
    return question;
  }

  if (action.type === "RESET") {
    const questionList: QuestionType[] = structuredClone(loadedQuestions);
    const question = nextQuestion(questionList);
    return {
      ...state,
      questions: questionList,
      answers: [],
      currentQuestion: question,
      phase: "QUIZ",
    };
  }

  if (action.type === "ANSWER") {
    const question = nextQuestion(state.questions);
    const newAnswers = [
      ...state.answers,
      { answer: action.id, questionId: state.currentQuestion!.id },
    ];
    if (!question)
      return {
        ...state,
        phase: "RESULTS",
        answers: newAnswers,
      };

    return {
      ...state,
      currentQuestion: question,
      answers: newAnswers,
    };
  }

  return state;
}

export const QuizContext = createContext<
  | {
      quiz: QuizStateType;
      dispatch: Dispatch<ActionType>;
    }
  | undefined
>(undefined);

export default function QuizContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [quiz, dispatch] = useReducer(quizReducer, initialQuizState);
  return (
    <QuizContext.Provider value={{ quiz, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}
