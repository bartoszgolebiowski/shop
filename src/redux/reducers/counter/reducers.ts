import { Action } from 'redux';
import { INCREMENT, DECREMENT } from '../../actions/counter/actionTypes'

type ReducerState = {
    value: number
}

const initalState = {
    value: 0
}

export default function counterReducer(state: ReducerState = initalState, action: Action): ReducerState {
    switch (action.type) {
        case INCREMENT:
            return { ...state, value: state.value + 1 }
        case DECREMENT:
            return { ...state, value: state.value - 1 }
        default:
            return state
    }
}