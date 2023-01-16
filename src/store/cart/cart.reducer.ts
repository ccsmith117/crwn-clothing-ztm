import {CartItem} from './cart.types'
import {AnyAction} from "redux";
import {setIsCartOpen, updateCartItems} from "./cart.action";

export type CartState = {
    readonly isCartOpen: boolean,
    readonly cartItems: CartItem[]
}

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (
    state = INITIAL_STATE,
    action: AnyAction
): CartState  => {

    if (updateCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        }
    }

    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload
        }
    }

    return state
}
