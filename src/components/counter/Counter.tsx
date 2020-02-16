import React from 'react'

type CounterProps = {
    value: Number,
    onIncrement: Function,
    onDecrement: Function
}

export const Counter = ({ value, onIncrement, onDecrement }: CounterProps) => {
    return (
        <div>
            <button onClick={() => onIncrement()}>
                Increment
            </button>
            {' '}
            <button onClick={() => onDecrement()}>
                Decrement
            </button>
            <hr />
            <div>
                Clicked: {value} times
            </div>
        </div>
    )
}

export default Counter