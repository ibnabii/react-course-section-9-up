import Counter from "./components/Counter";
import Header from "./components/Header.tsx";
import Auth from "./components/Auth.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import UserProfile from "./components/UserProfile.tsx";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  return (
    <>
      <Header />
      {!isAuthenticated && <Auth />}
      {isAuthenticated && <UserProfile />}
      <Counter />
    </>
  );
}

export default App;
