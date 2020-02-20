import { incrementAsync, decrementAsync } from "./actions";
import { INCREMENT_ASYNC, DECREMENT_ASYNC } from "./actionTypes";

describe("Counter actions", () => {
  it("decrementAsync", () => {
    const expectedAction = {
      type: DECREMENT_ASYNC
    };
    expect(decrementAsync()).toEqual(expectedAction);
  });
  it("incrementAsync", () => {
    const expectedAction = {
      type: INCREMENT_ASYNC
    };
    expect(incrementAsync()).toEqual(expectedAction);
  });
});
