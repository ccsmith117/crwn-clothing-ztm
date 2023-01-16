import {ActionWithPayload, createAction, withMatcher} from '../../utils/reducer/reducer.utils'
import {CART_ACTION_TYPES, CartItem} from './cart.types'
import {Product} from "../../components/product/product.component";

export type UpdateCartItems = ActionWithPayload<CART_ACTION_TYPES.UPDATE_CART_ITEMS, CartItem[]>
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export const updateCartItems = withMatcher((updateCartItems: CartItem[]): UpdateCartItems => createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, updateCartItems))
export const setIsCartOpen = withMatcher((isOpen: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen))

export const decreaseCartItemQuantity = (cartItems: CartItem[], id: number): UpdateCartItems => {
    const updatedCartItems = decreaseCartItemQuantityByOne(cartItems, id)
    return updateCartItems(updatedCartItems)
}

const decreaseCartItemQuantityByOne = (cartItems: CartItem[], id: number) => {
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

export const increaseCartItemQuantity = (cartItems: CartItem[], id: number) => {
    const updatedCartItems = cartItems.map((cartItem) => {
        return cartItem.id === id ?
            incrementQuantityOf(cartItem)
            :
            cartItem
    })
    return updateCartItems(updatedCartItems)
}

const incrementQuantityOf = (cartItem: CartItem) => {
    return {...cartItem, quantity: cartItem.quantity + 1}
}

export const removeItemFromCart = (cartItems: CartItem[], id: number): UpdateCartItems => {
    if (isExistingCartItem(cartItems, id)) {
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id)
        return updateCartItems(updatedCartItems)
    } else {
        throw new Error('Attempted to remove item from cart that does not exist!')
    }
}

const isExistingCartItem = (cartItems: CartItem[], productId: number) => {
    return cartItems.find((cartItem) => cartItem.id === productId)
}


export const addProductToCart = (cartItems: CartItem[], product: Product): UpdateCartItems => {
    return isExistingCartItem(cartItems, product.id) ?
        increaseCartItemQuantity(cartItems, product.id) : addNewProductToCart(cartItems, product)
}

const addNewProductToCart = (cartItems: CartItem[], product: Product) => {
    const updatedCartItems = [...cartItems, {...product, quantity: 1}]
    return updateCartItems(updatedCartItems)
}

