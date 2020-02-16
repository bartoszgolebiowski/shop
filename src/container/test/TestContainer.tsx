import React, { Dispatch } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import { incrementAsync, decrementAsync } from '../../redux/actions/counter/actions'
import { GET_RATES } from '../../graphql/query/home/queries'

import Counter from '../../components/counter/Counter'
import { Rate } from '../../graphql/model/home/models';
import { ApolloError } from 'apollo-boost';

type HomeProps = {
    value: number,
    onIncrement: Function,
    onDecrement: Function,
}

type RateProps = {
    loading: boolean,
    error: ApolloError | undefined,
    data: {
        rates: Rate[]
    }
}

export const Test = (props: HomeProps) => {
    const { loading, error, data } = useQuery(GET_RATES);
    const rateProps: RateProps = {
        loading, error, data
    }

    return (
        <div>
            <Rates {...rateProps} />
            <Counter {...props} />
        </div>
    );
}

const Rates = ({ loading, error, data }: RateProps) => {
    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error</div>}
            {data && <div>Fetch completed</div>}
        </div>
    )
}
const actionToProps = (dispatch: Dispatch<Action>) => ({
    onIncrement: () => dispatch(incrementAsync()),
    onDecrement: () => dispatch(decrementAsync()),
});

const stateToProps = (state: any) => ({
    value: state.counterReducer.value
});

export default connect(stateToProps, actionToProps)(Test)