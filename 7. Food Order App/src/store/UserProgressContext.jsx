import { createContext, useState } from "react";

const ProgressContext = createContext({
  progress: '',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress , setUserProgress] = useState('');

  function showCart() {
    setUserProgress('cart');
  };

  function hideCart() {
    setUserProgress('');
  };

  function showCheckout() {
    setUserProgress('checkout');
  };

  function hideCheckout() {
    setUserProgress('');
  };

  
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  };


  return <ProgressContext.Provider value={userProgressCtx}>
    {children}
  </ProgressContext.Provider>
};

export default ProgressContext;