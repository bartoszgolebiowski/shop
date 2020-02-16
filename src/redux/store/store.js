import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers/rootReducer.ts'
import rootSaga from '../sagas/rootSaga'

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducer,
        {},
        applyMiddleware(sagaMiddleware),
    )

    sagaMiddleware.run(rootSaga)

    return store;
}


