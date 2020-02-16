import { all } from 'redux-saga/effects'
import { watchIncrementAsync, watchDecrementAsync } from './counter/sagas'

export default function* rootSaga() {
    yield all([
        watchIncrementAsync(),
        watchDecrementAsync()
    ])
}