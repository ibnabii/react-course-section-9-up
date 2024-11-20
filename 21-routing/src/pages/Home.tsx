import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/products");
  };
  return (
    <>
      <h1>My home page</h1>
      <p>
        Go to <Link to="/products">products page</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate programmatically</button>
      </p>
    </>
  );
}
export default HomePage;
