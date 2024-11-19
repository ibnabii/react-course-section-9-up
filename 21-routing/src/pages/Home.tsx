import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>My home page</h1>
      <p>
        Go to <Link to="/products">products page</Link>
      </p>
    </>
  );
}
export default HomePage;
