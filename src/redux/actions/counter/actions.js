import { INCREMENT_ASYNC, DECREMENT_ASYNC } from '../../actions/counter/actionTypes'

const action = (type, payload = {}) => {
    return { type, ...payload }
}

export const incrementAsync = () => action(INCREMENT_ASYNC)
export const decrementAsync = () => action(DECREMENT_ASYNC)

