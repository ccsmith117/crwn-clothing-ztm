import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import { persistReducer, persistStore, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'
import { configureStore } from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist/es/constants'
import { listenerMiddleware } from './listener-middleware'

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()

const devMiddleWares = [logger]
const generalMiddleWares = [sagaMiddleware, listenerMiddleware]

const getMiddleWares = () => {
    return process.env.NODE_ENV === 'development'
        ? [...devMiddleWares, ...generalMiddleWares]
        : [...generalMiddleWares]
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(...getMiddleWares()),
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
