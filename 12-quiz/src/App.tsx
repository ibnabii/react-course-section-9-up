import Header from "./components/Header.tsx";
import Quiz from "./components/Quiz.tsx";
import QuizContextProvider from "./store/QuizContextProvider.tsx";

function App() {
  return (
    <>
      <Header />
      <QuizContextProvider>
        <Quiz />
      </QuizContextProvider>
    </>
  );
}

export default App;
