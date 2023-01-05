import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {rootReducer} from './root-reducer'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './root-saga'

const sagaMiddleware = createSagaMiddleware()

const devMiddleWares = [logger]
const generalMiddleWares = [sagaMiddleware]

const getMiddleWares = () => {
    return process.env.NODE_ENV === 'development' ? [...devMiddleWares, ...generalMiddleWares] : [...generalMiddleWares]
}

const composeEnhancers = compose(applyMiddleware(...getMiddleWares()))

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// todo: update deprecated createStore method to use redux-toolkit
export const store = createStore(persistedReducer, undefined, composeEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)