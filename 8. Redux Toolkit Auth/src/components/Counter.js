import classes from './Counter.module.css';
import { useSelector , useDispatch } from 'react-redux';
import { counterActions } from '../store/index.js';

const Counter = () => {
  const showCounter = useSelector((state) => state.counter.showToggle);
  const counter = useSelector((state) => state.counter.counter);
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(counterActions.increment());
  };

  function handleDecrement() {
    dispatch(counterActions.decrement());
  };


  function handleIncrease() {
    dispatch(counterActions.increase(10))
  };

  function handleShowCounter() {
    dispatch(counterActions.toggleCounter())
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleIncrease}>Increase by 10</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      <button onClick={handleShowCounter}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
