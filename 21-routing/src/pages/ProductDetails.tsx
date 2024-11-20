import { useParams } from "react-router-dom";

type ProductDetailsRouteParams = {
  productId: string;
};

function ProductDetailsPage() {
  const params = useParams<ProductDetailsRouteParams>();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
    </>
  );
}

export default ProductDetailsPage;
