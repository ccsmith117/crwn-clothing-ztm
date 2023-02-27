import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { RootState } from '../store'
import { Product } from '../../components/product/product.component'
import { CategoryItem } from '../categories/categories.store'

export type CartItem = CategoryItem & {
    quantity: number
}

export type CartState = {
    readonly isCartOpen: boolean
    readonly cartItems: CartItem[]
}

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        cartItemAdded(state, action: PayloadAction<Product>) {
            const cartItemToUpdate = state.cartItems.find(
                (cartItem) => cartItem.id === action.payload.id
            )
            if (cartItemToUpdate) {
                cartItemToUpdate.quantity += 1
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 })
            }
        },
        cartItemRemoved(state, action: PayloadAction<number>) {
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== action.payload
            )
        },
        cartItemQuantityDecreasedByOne(state, action: PayloadAction<number>) {
            const cartItemToUpdate = state.cartItems.find(
                (cartItem) => cartItem.id === action.payload
            )
            if (cartItemToUpdate) {
                cartItemToUpdate.quantity -= 1
                if (cartItemToUpdate.quantity === 0) {
                    state.cartItems = state.cartItems.filter(
                        (cartItem) => cartItem.id !== action.payload
                    )
                }
            }
        },
        cartItemQuantityIncreasedByOne(state, action: PayloadAction<number>) {
            const cartItemToUpdate = state.cartItems.find(
                (cartItem) => cartItem.id === action.payload
            )
            if (cartItemToUpdate) {
                cartItemToUpdate.quantity += 1
            }
        },
        toggledCartOpen(state, action: PayloadAction<boolean>) {
            state.isCartOpen = action.payload
        },
    },
})

export const {
    cartItemAdded,
    cartItemRemoved,
    cartItemQuantityIncreasedByOne,
    cartItemQuantityDecreasedByOne,
    toggledCartOpen,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer

const selectCartState = (state: RootState): CartState => state.cart

export const selectCartItems = createSelector(
    [selectCartState],
    (cart) => cart.cartItems
)

export const selectCartItemCount = createSelector(
    [selectCartItems],
    (cartItems) =>
        cartItems.reduce(
            (total: number, cartItem: CartItem) => total + cartItem.quantity,
            0
        )
)

export const selectCartTotalPrice = createSelector(
    [selectCartItems],
    (cartItems) =>
        cartItems.reduce(
            (total: number, cartItem: CartItem) =>
                total + cartItem.quantity * cartItem.price,
            0
        )
)

export const selectIsCartOpen = createSelector(
    [selectCartState],
    (cart) => cart.isCartOpen
)
