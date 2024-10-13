import { FormEvent, useContext } from "react";
import { MealOrder, OrderContext } from "../store/OrderContextProvider.tsx";
import Modal from "./Modal.tsx";
import Input from "./Input.tsx";

type CustomerType = {
  name: string;
  email: string;
  street: string;
  city: string;
  ["postal-code"]: string;
};

export async function sendRequest(items: MealOrder[], customer: CustomerType) {
  const order = { items, customer };
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to send order");
  }
  return resData.message;
}

export default function CheckoutForm() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("OrderContext must be used within a QuizContextProvider");
  }

  function closeForm() {
    context!.dispatch({ type: "FORM", open: false });
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const fd = new FormData(formElement);
    const data = Object.fromEntries(fd.entries()) as {
      [key: string]: FormDataEntryValue | FormDataEntryValue[];
    };
    try {
      const response = await sendRequest(
        context!.orderState.mealOrderList,
        data as CustomerType,
      );
      console.log(response);
      context!.dispatch({ type: "SUCCESS", open: true });
      closeForm();
    } catch (error) {
      console.log(error);
    }
  }

  const totalPrice = context.orderState.mealOrderList.reduce(
    (total, mealOrder) =>
      total + mealOrder.quantity * Number(mealOrder.meal.price),
    0,
  );

  return (
    <Modal open={context.orderState.orderFormModalOpened} onClose={closeForm}>
      <form onSubmit={submitOrder}>
        <div className="cart">
          <h2>Checkout</h2>
          <p>Total amount: ${totalPrice}</p>

          <Input label="Full name" id="name" type="text" name="name" required />
          <Input
            label="E-mail address"
            id="email"
            type="email"
            name="email"
            required
          />
          <Input
            label="Street"
            id="street"
            type="text"
            name="street"
            required
          />
          <div className="control-row">
            <Input
              label="Postal code"
              id="postal-code"
              type="text"
              name="postal-code"
              required
            />
            <Input label="City" id="city" type="text" name="city" required />
          </div>
        </div>
        <div className="modal-actions">
          <button className="text-button" onClick={closeForm}>
            Close
          </button>
          <button className="button">Submit Order</button>
        </div>
      </form>
    </Modal>
  );
}
