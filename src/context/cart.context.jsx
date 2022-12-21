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
    UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS',
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
        case CART_ACTIONS.UPDATE_CART_ITEMS:
            return {
                ...state,
                ...payload
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

const decrementQuantityOf = (cartItem) => {
    return {...cartItem, quantity: cartItem.quantity - 1}
}

export const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const {isCartOpen, cartItems, cartItemCount, cartTotalPrice} = cart

    const setIsCartOpen = (isOpen) => {
        dispatch({type: CART_ACTIONS.TOGGLE_CART_DROPDOWN, payload: isOpen})
    }

    const addProductToCart = (product) => {
        const updatedCartItems = isExistingCartItem(cartItems, product.id) ?
            increaseCartItemQuantityByOne(cartItems, product.id) : addNewProductToCart(cartItems, product)
        const updatedCartState = {
            cartItems: updatedCartItems,
            cartItemCount: updateCartItemCount(updatedCartItems),
            cartTotalPrice: updateCartTotalPrice(updatedCartItems)
        }
        dispatch({type: CART_ACTIONS.UPDATE_CART_ITEMS, payload: updatedCartState})
    }

    const decreaseCartItemQuantity = ({id}) => {
        const updatedCartItems = cartItems.map((cartItem) =>
            cartItem.id === id ?
                decrementQuantityOf(cartItem)
                :
                cartItem
        ).filter((cartItem) => cartItem.quantity > 0)
        const updatedCartState = {
            cartItems: updatedCartItems,
            cartItemCount: updateCartItemCount(updatedCartItems),
            cartTotalPrice: updateCartTotalPrice(updatedCartItems)
        }
        dispatch({type: CART_ACTIONS.UPDATE_CART_ITEMS, payload: updatedCartState})
    }

    const increaseCartItemQuantity = (product) => {
        addProductToCart(product)
    }

    const removeCartItem = ({id}) => {
        if (isExistingCartItem(cartItems, id)) {
            const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id)
            const updatedCartState = {
                cartItems: updatedCartItems,
                cartItemCount: updateCartItemCount(updatedCartItems),
                cartTotalPrice: updateCartTotalPrice(updatedCartItems)
            }
            dispatch({type: CART_ACTIONS.UPDATE_CART_ITEMS, payload: updatedCartState})
        }
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
