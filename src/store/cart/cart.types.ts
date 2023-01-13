export const CART_ACTION_TYPES = {
    UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

export type CartItem = {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    quantity: number,
}