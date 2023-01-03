import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {rootReducer} from './root-reducer'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const devMiddleWares = [logger]

const getMiddleWares = () => {
    return process.env.NODE_ENV === 'development' ? devMiddleWares : []
}

const composeEnhancers = compose(applyMiddleware(...getMiddleWares()))

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// todo: update deprecated createStore method to use redux-toolkit
export const store = createStore(persistedReducer, undefined, composeEnhancers)

export const persistor = persistStore(store)