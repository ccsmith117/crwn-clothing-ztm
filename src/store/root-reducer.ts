import { combineReducers } from 'redux'
import { userReducer } from './user/user.reducer'
import { cartReducer } from './cart/cart.store'
import { categoriesReducer } from './categories/categories.store'

export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    categories: categoriesReducer,
})
