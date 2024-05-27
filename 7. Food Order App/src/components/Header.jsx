import logo from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import ProgressContext from '../store/UserProgressContext.jsx';
import { useContext } from 'react';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(ProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems , currentItem) => 
    totalNumberOfItems + currentItem.quantity, 
    0);

  function handleShowCart() {
    userProgressCtx.showCart();
  };

  return <header id="main-header">
    <div id="title">      
      <img src={logo} alt='A restaurant'/>
      <h1>ReactFood</h1>
    </div>
    <nav>
      <Button onClick={handleShowCart} textOnly>
        Cart ({totalCartItems})
      </Button>
    </nav>
  </header>
};