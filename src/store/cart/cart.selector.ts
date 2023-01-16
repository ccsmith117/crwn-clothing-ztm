import {createSelector} from 'reselect'
import {CartItem} from "./cart.types";
import {CartState} from "./cart.reducer";
import {RootState} from "../store";

const selectCartState = (state: RootState): CartState => state.cart

export const selectCartItems = createSelector([selectCartState], (cart) => cart.cartItems)

export const selectCartItemCount = createSelector([selectCartItems],
    (cartItems) => cartItems.reduce((total: number, cartItem: CartItem) => total + cartItem.quantity, 0))

export const selectCartTotalPrice = createSelector([selectCartItems],
    (cartItems) => cartItems.reduce((total: number, cartItem: CartItem) => total + (cartItem.quantity * cartItem.price), 0))

export const selectIsCartOpen = createSelector([selectCartState], (cart) => cart.isCartOpen)
