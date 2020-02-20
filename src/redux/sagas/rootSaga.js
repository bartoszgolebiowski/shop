import { all } from "redux-saga/effects";
import { watchIncrementAsync, watchDecrementAsync } from "./counter/sagas";
import { watchConnectTokenGoogle } from "./authenticate/sagas";

export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    watchDecrementAsync(),
    watchConnectTokenGoogle()
  ]);
}
