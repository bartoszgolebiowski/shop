import { Action } from "redux";
import { INCREMENT, DECREMENT } from "../../actions/counter/actionTypes";

type CounterState = {
  value: number;
};

export const initalStateCounter: CounterState = {
  value: 0
};

export default function counterReducer(
  state: CounterState = initalStateCounter,
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
