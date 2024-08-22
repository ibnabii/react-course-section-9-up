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
  answer: string;
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
  id: AnswerType["answer"];
};

type ActionType = ResetAction | AnswerAction;

function quizReducer(state: QuizStateType, action: ActionType): QuizStateType {
  function nextQuestion(list: QuestionType[]): {
    question: QuestionType | null;
    newList: QuestionType[];
  } {
    if (!list.length) return { question: null, newList: list };
    const randomIndex = Math.floor(Math.random() * list.length);
    const question = list[randomIndex];
    const newList = list.filter((_, index) => index !== randomIndex);
    const shuffledAnswers = [...question.answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    question.answers = shuffledAnswers;
    return { question, newList };
  }

  if (action.type === "RESET") {
    const questionList: QuestionType[] = structuredClone(loadedQuestions);
    const { question, newList } = nextQuestion(questionList);
    return {
      ...state,
      questions: newList,
      answers: [],
      currentQuestion: question,
      phase: "QUIZ",
    };
  }

  if (action.type === "ANSWER") {
    const { question, newList } = nextQuestion(state.questions);
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
      questions: newList,
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
