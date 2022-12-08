import {createContext, useEffect, useState} from 'react'

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    cartItemCount: 0,
    cartTotalPrice: 0,
    addProductToCart: () => {},
    decreaseCartItemQuantity: () => {},
    increaseCartItemQuantity: () => {},
    removeCartItem: () => {}
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartItemCount, setCartItemCount] = useState(0)
    const [cartTotalPrice, setCartTotalPrice] = useState(0)

    useEffect(() => {
        updateCartItemCount()
    }, [cartItems])

    const updateCartItemCount = () => {
        const count = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0)
        setCartItemCount(count)
    }

    useEffect(() => {
        updateCartTotalPrice()
    }, [cartItems])

    const updateCartTotalPrice = () => {
        const count = cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity * cartItem.price), 0)
        setCartTotalPrice(count)
    }

    const addProductToCart = (product) => {
        const updatedCartItems = isExistingCartItem(product.id) ? increaseCartItemQuantityByOne(product.id) : addNewProductToCart(product)
        setCartItems(updatedCartItems)
    }

    const isExistingCartItem = (productId) => {
        return cartItems.find((cartItem) => cartItem.id === productId)
    }

    const increaseCartItemQuantityByOne = (id) => {
        return cartItems.map((cartItem) => {
            return cartItem.id === id ?
                incrementQuantityOf(cartItem)
                :
                cartItem
        })
    }

    const addNewProductToCart = (product) => {
        return [...cartItems, {...product, quantity: 1}]
    }

    const incrementQuantityOf = (cartItem) => {
        return {...cartItem, quantity: cartItem.quantity + 1}
    }

    const decreaseCartItemQuantity = (cartItem) => {
        if (isExistingCartItem(cartItem.id)) {
           setCartItems(decreaseCartItemQuantityByOne(cartItem.id))
        }
    }

    const decreaseCartItemQuantityByOne = (id) => {
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

    const increaseCartItemQuantity = (cartItem) => {
        if (isExistingCartItem(cartItem.id)) {
            setCartItems(increaseCartItemQuantityByOne(cartItem.id))
        }
    }

    const removeCartItem = (cartItemToRemove) => {
        if (isExistingCartItem(cartItemToRemove.id)) {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id))
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
