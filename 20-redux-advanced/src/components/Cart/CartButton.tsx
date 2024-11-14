import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { cartActions } from "../../store/cart.ts";
import { RootState } from "../../store";
import { itemsCount } from "../../store/cart.ts";

const CartButton = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => itemsCount(state.cart));

  function toggleCart() {
    dispatch(cartActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{items}</span>
    </button>
  );
};

export default CartButton;
