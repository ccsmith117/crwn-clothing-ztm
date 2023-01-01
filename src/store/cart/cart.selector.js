import {createSelector} from 'reselect'

const selectCartState = (state) => state.cart

export const selectCartItems = createSelector([selectCartState], (cart) => cart.cartItems)

export const selectCartItemCount = createSelector([selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0))

export const selectCartTotalPrice = createSelector([selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0))

export const selectIsCartOpen = createSelector([selectCartState], (cart) => cart.isCartOpen)
