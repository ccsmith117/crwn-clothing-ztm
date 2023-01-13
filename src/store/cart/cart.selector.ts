import {createSelector} from 'reselect'
import {CartItem} from "./cart.types";

const selectCartState = (state: any) => state.cart

export const selectCartItems = createSelector([selectCartState], (cart): CartItem[] => cart.cartItems)

export const selectCartItemCount = createSelector([selectCartItems],
    (cartItems): number => cartItems.reduce((total: number, cartItem: CartItem) => total + cartItem.quantity, 0))

export const selectCartTotalPrice = createSelector([selectCartItems],
    (cartItems): number => cartItems.reduce((total: number, cartItem: CartItem) => total + (cartItem.quantity * cartItem.price), 0))

export const selectIsCartOpen = createSelector([selectCartState], (cart) => cart.isCartOpen)
