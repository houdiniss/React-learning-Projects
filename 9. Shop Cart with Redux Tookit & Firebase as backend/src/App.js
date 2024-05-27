import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/UI/Notification.js';
import { uiActions } from './store/ui-slice.js';
import { cartActions } from './store/cart-slice.js';

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    async function fetchCartData() {
      const response = await fetch('https://backend-for-react-app-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

      if(!response.ok) {
        throw new Error('Failed to fetch data.')
      };

      const data = await response.json();
      dispatch(cartActions.replaceCart({
        items: data.items || [],
        totalQuantity: data.totalQuantity
      }));
    };

    fetchCartData().catch((error) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error...',
        message: 'Fetching cart data failed!'
      }));
    });
  } , [dispatch]);

  useEffect(() => {
    async function postCartData() {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!'
      }));

      const response = await fetch('https://backend-for-react-app-default-rtdb.europe-west1.firebasedatabase.app/cart.json',{
        method: 'PUT',
        body: JSON.stringify(cart)
      });

      if(!response.ok) {
        throw new Error('Sending cart data failed.');
      };

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success...',
        message: 'Sent cart data successfully!'
      }));
    };

    if(isInitial) {
      isInitial = false;
      return;
    };
    
    if(cart.changed) {
      postCartData().catch((error) => {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: 'Sending cart data failed!'
        }));
      });
    }
  } , [cart,dispatch]);

  return (
    <>
      {notification && 
        <Notification 
          status={notification.status} 
          title={notification.title} 
          message={notification.message}
        />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
