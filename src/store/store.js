import {rootReducer} from './root-reducer'
import {applyMiddleware, compose, createStore} from 'redux'
import {logger} from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [logger]

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)