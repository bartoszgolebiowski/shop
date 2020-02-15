import { put, takeEvery, call } from 'redux-saga/effects'
import { INCREMENT, DECREMENT, INCREMENT_ASYNC, DECREMENT_ASYNC} from '../../actions/counter/actionTypes'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* incrementAsync() {
    yield call(delay, 1000)
    yield put({ type: INCREMENT })
}

function* decrementAsync() {
    yield call(delay, 1000)
    yield put({ type: DECREMENT })
}

export function* watchIncrementAsync() {
    yield takeEvery(INCREMENT_ASYNC, incrementAsync)
}

export function* watchDecrementAsync() {
    yield takeEvery(DECREMENT_ASYNC, decrementAsync)
}

