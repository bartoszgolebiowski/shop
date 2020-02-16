import { fork, takeEvery } from 'redux-saga/effects';

import { INCREMENT_ASYNC, DECREMENT_ASYNC } from '../../actions/counter/actionTypes'
import { incrementAsync, decrementAsync, watchIncrementAsync, watchDecrementAsync } from './sagas'

describe('Check if counter generators works', () => {
    it('Handle increment', () => {
        const generator = watchIncrementAsync();
        expect(generator.next().value.args).toEqual(fork(takeEvery, INCREMENT_ASYNC, incrementAsync).args);
    });

    it('Handle decrement', () => {
        const generator = watchDecrementAsync();
        expect(generator.next().value.args).toEqual(fork(takeEvery, DECREMENT_ASYNC, decrementAsync).args);
    });
});