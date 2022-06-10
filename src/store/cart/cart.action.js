import {createAction} from '../../utils/reducer/reducer.utils'
import {CART_ACTION_TYPES} from './cart.types'

export const setIsCartOpen = (isOpen) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)

const addCartItem = (cartItems, itemToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === itemToAdd.id
    )
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === itemToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1}
                :
                cartItem
        )
    } else {
        return [...cartItems, {...itemToAdd, quantity: 1}]
    }
}

const removeCartItem = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === itemToRemove.id
    )
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem => cartItem.id !== itemToRemove.id))
    } else {
        return cartItems.map((cartItem) =>
            cartItem.id === itemToRemove.id ?
                {...cartItem, quantity: cartItem.quantity - 1}
                :
                cartItem
        )    }
}

const clearCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
}

export const addItemToCart = (cartItems, itemToAdd) => {
    const updatedCartItems = addCartItem(cartItems, itemToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems)
}

export const removeItemFromCart = (cartItems, itemToRemove) => {
    const updatedCartItems = removeCartItem(cartItems, itemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems)
}

export const clearItemFromCart = (cartItems, itemToClear) => {
    const updatedCartItems = clearCartItem(cartItems, itemToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems)
}