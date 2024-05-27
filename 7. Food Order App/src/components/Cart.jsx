import Modal from "../components/UI/Modal.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import Button from "../components/UI/Button.jsx";
import ProgressContext from "../store/UserProgressContext.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(ProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalCost , item) => totalCost + item.price * item.quantity ,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }


  return (
    <Modal 
      className="cart" 
      open={userProgressCtx.progress === 'cart'} 
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => 
          <li className="cart-item" key={item.id}>
            <p>
              {item.name} - {item.quantity} x {item.price}
            </p>
            <p className="cart-item-actions">
              <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => cartCtx.addItem(item)}>+</button>
            </p>
          </li>
        )}
      </ul>
      <p className="cart-total">${cartTotal}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>Close</Button>
        {cartCtx.items.length > 0 && 
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        }
      </p>
    </Modal>
  )
};  