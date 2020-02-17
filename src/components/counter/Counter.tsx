import React from 'react'

export type CounterProps = {
    value: Number,
    onIncrement: Function,
    onDecrement: Function
}

export const Counter = ({ value, onIncrement, onDecrement }: CounterProps) => {
    return (
        <div>
            <button id='increment' onClick={() => onIncrement()}>
                Increment
            </button>
            {' '}
            <button id='decrement' onClick={() => onDecrement()}>
                Decrement
            </button>
            <hr />
            <div id='counter_value'>
                Clicked: {value} times
            </div>
        </div>
    )
}

export default Counter