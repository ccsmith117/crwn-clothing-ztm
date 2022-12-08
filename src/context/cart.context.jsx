import {createContext, useEffect, useState} from 'react'

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    cartItemCount: 0,
    addProductToCart: () => {}
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartItemCount, setCartItemCount] = useState(0)

    useEffect(() => {
        const count = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0)
        setCartItemCount(count)
    }, [cartItems])

    const addProductToCart = (product) => {
        const updatedCartItems = isExistingCartItem(product) ? updateCartItemQuantity(product) : addNewProductToCart(product)
        setCartItems(updatedCartItems)
    }

    const isExistingCartItem = (product) => {
        return cartItems.find((cartItem) => cartItem.id === product.id)
    }

    const updateCartItemQuantity = (product) => {
        return cartItems.map((cartItem) => {
            return cartItem.id === product.id ?
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

    const value = {isCartOpen, setIsCartOpen, cartItems, cartItemCount, addProductToCart}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
