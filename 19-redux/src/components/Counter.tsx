import { useDispatch, useSelector } from "react-redux";

import { DispatchType, RootState } from "../store";
import { counterActions } from "../store/counter.ts";

import classes from "./Counter.module.css";
// For class based version:
// import { Component } from "react";
// import {connect } from "react-redux";

const Counter = () => {
  const dispatch: DispatchType = useDispatch();
  // // This gives warning
  // const { counter, showCounter } = useSelector((state: RootState) => ({
  //   counter: state.counter.counter,
  //   showCounter: state.counter.showCounter,
  // }));
  // // Use separate useSelector calls to avoid creating a new object each time
  const counter = useSelector((state: RootState) => state.counter.counter);
  const showCounter = useSelector(
    (state: RootState) => state.counter.showCounter,
  );
  // or if i want entire counter:
  // const counter = useSelector((state: RootState) => state.counter);
  // then usage: counter.counter and counter.showCounter

  const toggleCounterHandler = () => {
    // dispatch({ type: "TOGGLE_COUNTER" });
    dispatch(counterActions.toggleCounter());
  };

  const incrementHandler = () => {
    // dispatch({ type: "INCREMENT" });
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    // dispatch({ type: "DECREMENT" });
    dispatch(counterActions.decrement());
  };

  const increaseHandler = () => {
    // dispatch({ type: "INCREASE", amount: 5 });
    dispatch(counterActions.increase({ amount: 5 }));
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// // Class based component version
// type Props = ReturnType<typeof mapStateToProps> &
//   ReturnType<typeof mapDispatchToProps>;
//
// class Counter extends Component<Props> {
//   incrementHandler() {
//     this.props.increment();
//   }
//   decrementHandler() {
//     this.props.decrement();
//   }
//   toggleCounterHandler() {}
//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }
//
// const mapStateToProps = (state: StateType) => {
//   return {
//     counter: state.counter,
//   };
// };
//
// const mapDispatchToProps = (dispatch: DispatchType) => {
//   return {
//     increment: () => dispatch({ type: "INCREMENT" }),
//     decrement: () => dispatch({ type: "DECREMENT" }),
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
