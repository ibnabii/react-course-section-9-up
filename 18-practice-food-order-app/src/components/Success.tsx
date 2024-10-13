import Modal from "./Modal.tsx";
import { useContext } from "react";
import { OrderContext } from "../store/OrderContextProvider.tsx";

export default function Success() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("OrderContext must be used within a QuizContextProvider");
  }

  function closeDialog() {
    context!.dispatch({ type: "RESET" });
  }

  return (
    <Modal open={context.orderState.succesModalOpened} onClose={closeDialog}>
      <div className="cart">
        <h2>Success</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
      </div>
      <div className="modal-actions">
        <button className="button" onClick={closeDialog}>
          Okay
        </button>
      </div>
    </Modal>
  );
}
