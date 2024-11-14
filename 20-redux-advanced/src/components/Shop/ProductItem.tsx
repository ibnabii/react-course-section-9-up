import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart.ts";

export type ProductItemType = {
  title: string;
  price: number;
  description: string;
};

const ProductItem = (props: ProductItemType) => {
  const { title, price, description } = props;
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(cartActions.addToCart({ title, price }));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
