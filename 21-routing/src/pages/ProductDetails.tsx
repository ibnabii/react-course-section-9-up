import { Link, useParams } from "react-router-dom";

type ProductDetailsRouteParams = {
  productId: string;
};

function ProductDetailsPage() {
  const params = useParams<ProductDetailsRouteParams>();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      <p>
        <Link to=".." relative="path">
          Back path
        </Link>
      </p>
      <p>
        <Link to=".." relative="route">
          Back route
        </Link>
      </p>
      <p>
        <Link to="..">Back default</Link>
      </p>
    </>
  );
}

export default ProductDetailsPage;
