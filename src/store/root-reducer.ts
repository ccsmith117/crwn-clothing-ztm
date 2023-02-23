import {combineReducers} from 'redux'
import {userReducer} from './user/user.reducer'
import {categoriesReducer} from './categories/categories.reducer'
import {cartReducer} from './cart/cart.store'

export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    categories: categoriesReducer,
})
