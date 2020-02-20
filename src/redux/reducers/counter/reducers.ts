import { Action } from "redux";
import { INCREMENT, DECREMENT } from "../../actions/counter/actionTypes";

type CounterState = {
  value: number;
};

const initalState = {
  value: 0
};

export default function counterReducer(
  state: CounterState = initalState,
  action: Action
): CounterState {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}
