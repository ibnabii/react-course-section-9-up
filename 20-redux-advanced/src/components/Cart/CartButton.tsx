import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { RootState } from "../../store";
import { uiActions } from "../../store/ui-slice.ts";
import { itemsCount } from "../../store/cart-actions.ts";

const CartButton = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => itemsCount(state.cart));

  function toggleCart() {
    dispatch(uiActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{items}</span>
    </button>
  );
};

export default CartButton;
