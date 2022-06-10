import {createSelector} from 'reselect'

const selectCartReducer = (state) => state.cart

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.isCartOpen
)

export const selectCartItemQuantity = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((totalQuantity, cartItem) =>
        totalQuantity + cartItem.quantity, 0)
)

export const selectCartPriceTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((totalPrice, cartItem) =>
        totalPrice + (cartItem.price * cartItem.quantity), 0)
)
