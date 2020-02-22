import { all } from "redux-saga/effects";
import { watchIncrementAsync, watchDecrementAsync } from "./counter/sagas";
import { watchConnectToken } from "./authenticate/sagas";

export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    watchDecrementAsync(),
    watchConnectToken()
  ]);
}
