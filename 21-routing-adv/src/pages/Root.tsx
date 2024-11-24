import { Outlet } from "react-router-dom";
// Approach to loading state #1
// import { useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation.tsx";

function RootLayout() {
  // Approach to loading state #1
  // const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        {/* Approach to loading state #1*/}
        {/*{navigation.state === "loading" && <p>Loading...</p>}*/}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
