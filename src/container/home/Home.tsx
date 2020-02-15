import React, { Dispatch } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'

import { incrementAsync, decrementAsync } from '../../redux/actions/counter/actions'
import Counter from '../counter/Counter'


type HomeProps = {
    value: Number,
    onIncrement: Function,
    onDecrement: Function,
}

export const Home = (props: HomeProps) => {
    return (
        <Counter {...props} />
    )
}

const actionToProps = (dispatch: Dispatch<Action>) => ({
    onIncrement: () => dispatch(incrementAsync()),
    onDecrement: () => dispatch(decrementAsync()),
});

const stateToProps = (state: any) => ({
    value: state.counterReducer.value,
});

export default connect(stateToProps, actionToProps)(Home)