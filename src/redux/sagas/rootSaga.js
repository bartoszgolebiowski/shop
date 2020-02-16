import { all } from 'redux-saga/effects'
import { watchIncrementAsync, watchDecrementAsync } from './counter/counterSagas'

export default function* rootSaga() {
    yield all([
        watchIncrementAsync(),
        watchDecrementAsync()
    ])
}