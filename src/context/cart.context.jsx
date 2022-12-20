import {createContext, useReducer} from 'react'

export const CartContext = createContext({
    isOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    cartItemCount: 0,
    cartTotalPrice: 0,
    addProductToCart: () => {},
    decreaseCartItemQuantity: () => {},
    increaseCartItemQuantity: () => {},
    removeCartItem: () => {}
})

const CART_ACTIONS = {
    ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
    INCREASE_ITEM_QUANTITY: 'INCREASE_ITEM_QUANTITY',
    DECREASE_ITEM_QUANTITY: 'DECREASE_ITEM_QUANTITY',
    REMOVE_PRODUCT_FROM_CART: 'REMOVE_PRODUCT_FROM_CART',
    TOGGLE_CART_DROPDOWN: 'TOGGLE_CART_DROPDOWN'
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
        case CART_ACTIONS.ADD_PRODUCT_TO_CART:
        case CART_ACTIONS.INCREASE_ITEM_QUANTITY:
            return {
                ...state,
                ...addProductToCart(state.cartItems, payload)
            }
        case CART_ACTIONS.DECREASE_ITEM_QUANTITY:
            return {
                ...state,
                ...decreaseCartItemQuantityByOne(state.cartItems, payload)
            }
        case CART_ACTIONS.REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                ...removeCartItem(state.cartItems, payload)
            }
        case CART_ACTIONS.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unsupported type ${type} in cartReducer`)
    }
}

const addProductToCart = (cartItems, product) => {
    const updatedCartItems = isExistingCartItem(cartItems, product.id) ?
        increaseCartItemQuantityByOne(cartItems, product.id) : addNewProductToCart(cartItems, product)
    const cartItemCount = updateCartItemCount(updatedCartItems)
    const cartTotalPrice = updateCartTotalPrice(updatedCartItems)
    return {
        cartItems: updatedCartItems,
        cartItemCount,
        cartTotalPrice
    }
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
    const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === id ?
            decrementQuantityOf(cartItem)
            :
            cartItem
    ).filter((cartItem) => cartItem.quantity > 0)
    const cartItemCount = updateCartItemCount(updatedCartItems)
    const cartTotalPrice = updateCartTotalPrice(updatedCartItems)
    return {
        cartItems: updatedCartItems,
        cartItemCount,
        cartTotalPrice
    }
}

const decrementQuantityOf = (cartItem) => {
    return {...cartItem, quantity: cartItem.quantity - 1}
}

const removeCartItem = (cartItems, id) => {
    if (isExistingCartItem(cartItems, id)) {
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id)
        const cartItemCount = updateCartItemCount(updatedCartItems)
        const cartTotalPrice = updateCartTotalPrice(updatedCartItems)
        return {
            cartItems: updatedCartItems,
            cartItemCount,
            cartTotalPrice
        }
    }
}

export const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const {isCartOpen, cartItems, cartItemCount, cartTotalPrice} = cart

    const setIsCartOpen = (isOpen) => {
        dispatch({type: CART_ACTIONS.TOGGLE_CART_DROPDOWN, payload: isOpen})
    }

    const addProductToCart = (product) => {
        dispatch({type: CART_ACTIONS.ADD_PRODUCT_TO_CART, payload: product})
    }

    const decreaseCartItemQuantity = (product) => {
        dispatch({type: CART_ACTIONS.DECREASE_ITEM_QUANTITY, payload: product.id})
    }

    const increaseCartItemQuantity = (product) => {
        dispatch({type: CART_ACTIONS.INCREASE_ITEM_QUANTITY, payload: product.id})
    }

    const removeCartItem = (product) => {
        dispatch({type: CART_ACTIONS.REMOVE_PRODUCT_FROM_CART, payload: product.id})
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        cartItemCount,
        cartTotalPrice,
        addProductToCart,
        decreaseCartItemQuantity,
        increaseCartItemQuantity,
        removeCartItem
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
