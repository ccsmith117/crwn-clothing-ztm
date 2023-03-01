import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
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

const devMiddleWares = [logger]
const generalMiddleWares = [listenerMiddleware]

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

export const persistor = persistStore(store)
