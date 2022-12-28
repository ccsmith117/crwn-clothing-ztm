import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'

import {rootReducer} from './root-reducer'

const middleWares = [logger]

const composeEnhancers = compose(applyMiddleware(...middleWares))

// todo: update deprecated createStore method to use redux-toolkit
export const store = createStore(rootReducer, undefined, composeEnhancers)
