import {createContext, useReducer} from 'react'
import {createAction} from '../utils/reducer/reducer.utils'

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartItemCount: 0,
    cartPrice: 0
})

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

const cartReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

const INITIAL_STATE = {
    cartItems: [],
    cartItemCount: 0,
    cartPrice: 0,
    isCartOpen: false
}

export const CartProvider = ({children}) => {
    const [ {cartItemCount, isCartOpen, cartPrice, cartItems}, dispatch ] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (updatedCartItems) => {
        const cartItemQuantity = updatedCartItems.reduce((totalQuantity, cartItem) =>
            totalQuantity + cartItem.quantity, 0)

        const cartPriceTotal = updatedCartItems.reduce((totalPrice, cartItem) =>
            totalPrice + (cartItem.price * cartItem.quantity), 0)

        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS, {
                    cartItems: updatedCartItems,
                    cartPrice: cartPriceTotal,
                    cartItemCount: cartItemQuantity
                }
            )
        )
    }

    const setIsCartOpen = (isOpen) => {
        dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isOpen})
    }

    const addItemToCart = (itemToAdd) => {
        const updatedCartItems = addCartItem(cartItems, itemToAdd)
        updateCartItemsReducer(updatedCartItems)
    }

    const removeItemFromCart = (itemToRemove) => {
        const updatedCartItems = removeCartItem(cartItems, itemToRemove)
        updateCartItemsReducer(updatedCartItems)
    }

    const clearItemFromCart = (itemToRemove) => {
        const updatedCartItems = clearCartItem(cartItems, itemToRemove)
        updateCartItemsReducer(updatedCartItems)
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItemCount,
        cartPrice
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}