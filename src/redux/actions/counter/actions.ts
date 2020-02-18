import { INCREMENT_ASYNC, DECREMENT_ASYNC } from './actionTypes'

const action = (type: string, payload: any = {}) => {
    return { type, ...payload }
}

export const incrementAsync = () => action(INCREMENT_ASYNC)
export const decrementAsync = () => action(DECREMENT_ASYNC)

