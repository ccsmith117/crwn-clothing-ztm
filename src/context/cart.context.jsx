import {createContext, useReducer} from 'react'
import {createAction} from '../utils/reducer/reducer.utils'

export const CartContext = createContext({
    isOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    cartItemCount: 0,
    cartTotalPrice: 0,
    addItemToCart: () => {},
    decreaseCartItemQuantity: () => {},
    increaseCartItemQuantity: () => {},
    removeItemFromCart: () => {}
})

const CART_ACTION_TYPES = {
    UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartItemCount: 0,
    cartTotalPrice: 0,
}

const cartReducer = (state, action) => {
    const {type, payload} = action

    switch (type) {
        case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
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
            throw new Error(`Unsupported type ${type} in cartReducer`)
    }
}

const addProductToCart = (cartItems, product) => {
    return isExistingCartItem(cartItems, product.id) ?
        increaseCartItemQuantityByOne(cartItems, product.id) : addNewProductToCart(cartItems, product)
}

const isExistingCartItem = (cartItems, productId) => {
    return cartItems.find((cartItem) => cartItem.id === productId)
}

const increaseCartItemQuantityByOne = (cartItems, id) => {
    return cartItems.map((cartItem) => {
        return cartItem.id === id ?
            incrementQuantityOf(cartItem)
            :
            cartItem
    })
}

const addNewProductToCart = (cartItems, product) => {
    return [...cartItems, {...product, quantity: 1}]
}

const incrementQuantityOf = (cartItem) => {
    return {...cartItem, quantity: cartItem.quantity + 1}
}

const updateCartItemCount = (cartItems) => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
}

const updateCartTotalPrice = (cartItems) => {
    return cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
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

const removeCartItem = (cartItems, id) => {
    if (isExistingCartItem(cartItems, id)) {
        return cartItems.filter((cartItem) => cartItem.id !== id)
    }
}

export const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const {isCartOpen, cartItems, cartItemCount, cartTotalPrice} = cart

    const setIsCartOpen = (isOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen))
    }

    const addItemToCart = (product) => {
        const updatedCartItems = addProductToCart(cartItems, product)
        updateCartItemState(updatedCartItems)
    }

    const decreaseCartItemQuantity = ({id}) => {
        const updatedCartItems = decreaseCartItemQuantityByOne(cartItems, id)
        updateCartItemState(updatedCartItems)
    }

    const increaseCartItemQuantity = (product) => {
        addItemToCart(product)
    }

    const removeItemFromCart = ({id}) => {
        if (isExistingCartItem(cartItems, id)) {
            const updatedCartItems = removeCartItem(cartItems, id)
            updateCartItemState(updatedCartItems)
        }
    }

    const updateCartItemState = (updatedCartItems) => {
        const updatedCartState = {
            cartItems: updatedCartItems,
            cartItemCount: updateCartItemCount(updatedCartItems),
            cartTotalPrice: updateCartTotalPrice(updatedCartItems)
        }
        dispatch(createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updatedCartState))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        cartItemCount,
        cartTotalPrice,
        addItemToCart,
        decreaseCartItemQuantity,
        increaseCartItemQuantity,
        removeItemFromCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
