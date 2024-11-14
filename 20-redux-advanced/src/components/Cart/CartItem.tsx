import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart.ts";

type ItemType = {
  title: string;
  quantity: number;
  total: number;
  price: number;
};

type CartItemProps = {
  item: ItemType;
};
const CartItem = (props: CartItemProps) => {
  const { title, quantity, total, price } = props.item;
  const dispatch = useDispatch();

  function handleIncreaseQuantity() {
    dispatch(cartActions.addToCart({ title, price }));
  }

  function handleDecreaseQuantity() {
    dispatch(cartActions.removeFromCart({ title }));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDecreaseQuantity}>-</button>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
