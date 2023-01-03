import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {rootReducer} from './root-reducer'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const devMiddleWares = [logger]

const generalMiddleWares = [thunk]

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

export const persistor = persistStore(store)