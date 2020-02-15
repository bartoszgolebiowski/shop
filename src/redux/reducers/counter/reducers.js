import { INCREMENT, DECREMENT } from '../../actions/counter/actionTypes'

const initalState = {
    value: 0
}

export default function counterReducer(state = initalState, action) {
    switch (action.type) {
        case INCREMENT:
            return { ...state, value: state.value + 1 }
        case DECREMENT:
            return { ...state, value: state.value - 1 }
        default:
            return state
    }
}