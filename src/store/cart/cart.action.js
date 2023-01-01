import {createAction} from '../../utils/reducer/reducer.utils'
import {CART_ACTION_TYPES} from './cart.types'

export const setIsCartOpen = (isOpen) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)

export const decreaseCartItemQuantity = (cartItems, id) => {
    const updatedCartItems = decreaseCartItemQuantityByOne(cartItems, id)
    return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updatedCartItems)
}

const decreaseCartItemQuantityByOne = (cartItems, id) => {
    return cartItems.map((cartItem) =>
        cartItem.id === id ?
            decrementQuantityOf(cartItem)
            :
            cartItem
    ).filter((cartItem) => cartItem.quantity > 0)
}

const decrementQuantityOf = (cartItem) => {
    return {...cartItem, quantity: cartItem.quantity - 1}
}

export const increaseCartItemQuantity = (cartItems, id) => {
    const updatedCartItems = cartItems.map((cartItem) => {
        return cartItem.id === id ?
            incrementQuantityOf(cartItem)
            :
            cartItem
    })
    return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updatedCartItems)
}

const incrementQuantityOf = (cartItem) => {
    return {...cartItem, quantity: cartItem.quantity + 1}
}

export const removeItemFromCart = (cartItems, id) => {
    if (isExistingCartItem(cartItems, id)) {
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id)
        return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updatedCartItems)
    }
}

const isExistingCartItem = (cartItems, productId) => {
    return cartItems.find((cartItem) => cartItem.id === productId)
}


export const addProductToCart = (cartItems, product) => {
    return isExistingCartItem(cartItems, product.id) ?
        increaseCartItemQuantity(cartItems, product.id) : addNewProductToCart(cartItems, product)
}

const addNewProductToCart = (cartItems, product) => {
    const updatedCartItems = [...cartItems, {...product, quantity: 1}]
    return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updatedCartItems)
}

