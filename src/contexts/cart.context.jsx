import {createContext, useEffect, useState} from 'react'

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartItemCount, setCartItemCount] = useState(0)
    const [cartPrice, setCartPrice] = useState(0)

    useEffect(() => {
        const quantityInCart = cartItems.reduce((totalQuantity, cartItem) =>
            totalQuantity + cartItem.quantity, 0)
        setCartItemCount(quantityInCart)
    }, [cartItems])

    useEffect(() => {
        const cartPriceTotal = cartItems.reduce((totalPrice, cartItem) =>
            totalPrice + (cartItem.price * cartItem.quantity), 0)
        setCartPrice(cartPriceTotal)
    }, [cartItems])

    const addItemToCart = (itemToAdd) => {
        const updatedCartItems = addCartItem(cartItems, itemToAdd)
        setCartItems(updatedCartItems)
    }

    const removeItemFromCart = (itemToRemove) => {
        const updatedCartItems = removeCartItem(cartItems, itemToRemove)
        setCartItems(updatedCartItems)
    }

    const clearItemFromCart = (itemToRemove) => {
        const updatedCartItems = clearCartItem(cartItems, itemToRemove)
        setCartItems(updatedCartItems)
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