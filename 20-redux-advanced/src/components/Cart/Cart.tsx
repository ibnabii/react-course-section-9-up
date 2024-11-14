import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { RootState } from "../../store";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.products);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.length === 0
          ? "Your cart is empty!"
          : cartItems.map((item) => (
              <CartItem
                item={{
                  title: item.title,
                  quantity: item.quantity,
                  total: item.price * item.quantity,
                  price: item.price,
                }}
                key={item.title}
              />
            ))}
      </ul>
    </Card>
  );
};

export default Cart;
