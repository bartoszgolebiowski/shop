import reducer from "./reducers";

import { INCREMENT, DECREMENT } from "../../actions/counter/actionTypes";

describe("Counter reducer", () => {
  it("decrement", () => {
    expect(reducer(undefined, { type: DECREMENT })).toEqual({ value: -1 });
  });

  it("increment", () => {
    expect(reducer(undefined, { type: INCREMENT })).toEqual({ value: 1 });
  });

  it("decrement and increment complex", () => {
    let result = reducer({ value: 10 }, { type: INCREMENT });
    result = reducer(result, { type: INCREMENT });
    result = reducer(result, { type: INCREMENT });
    result = reducer(result, { type: INCREMENT });
    result = reducer(result, { type: DECREMENT });
    result = reducer(result, { type: INCREMENT });
    expect(result).toEqual({ value: 14 });
  });
});
