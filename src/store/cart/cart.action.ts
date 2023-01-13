import {createAction} from '../../utils/reducer/reducer.utils'
import {CART_ACTION_TYPES, CartItem} from './cart.types'
import ProductComponent from "../../components/product/product.component";

export const setIsCartOpen = (isOpen: boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)

export const decreaseCartItemQuantity = (cartItems: CartItem[], id: string) => {
    const updatedCartItems = decreaseCartItemQuantityByOne(cartItems, id)
    return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updatedCartItems)
}

const decreaseCartItemQuantityByOne = (cartItems: CartItem[], id: string) => {
    return cartItems.map((cartItem) =>
        cartItem.id === id ?
            decrementQuantityOf(cartItem)
            :
            cartItem
    ).filter((cartItem) => cartItem.quantity > 0)
}

const decrementQuantityOf = (cartItem: CartItem) => {
    return {...cartItem, quantity: cartItem.quantity - 1}
}

export const increaseCartItemQuantity = (cartItems: CartItem[], id: string) => {
    const updatedCartItems = cartItems.map((cartItem) => {
        return cartItem.id === id ?
            incrementQuantityOf(cartItem)
            :
            cartItem
    })
    return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updatedCartItems)
}

const incrementQuantityOf = (cartItem: CartItem) => {
    return {...cartItem, quantity: cartItem.quantity + 1}
}

export const removeItemFromCart = (cartItems: CartItem[], id: string) => {
    if (isExistingCartItem(cartItems, id)) {
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id)
        return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updatedCartItems)
    } else {
        throw new Error('Attempted to remove item from cart that does not exist!')
    }
}

const isExistingCartItem = (cartItems: CartItem[], productId: string) => {
    return cartItems.find((cartItem) => cartItem.id === productId)
}


export const addProductToCart = (cartItems: CartItem[], product: ProductComponent) => {
    return isExistingCartItem(cartItems, product.id) ?
        increaseCartItemQuantity(cartItems, product.id) : addNewProductToCart(cartItems, product)
}

const addNewProductToCart = (cartItems: CartItem[], product: ProductComponent) => {
    const updatedCartItems = [...cartItems, {...product, quantity: 1}]
    return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updatedCartItems)
}

