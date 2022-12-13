import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'
import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles'

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartItemCount} = useContext(CartContext)
    const toggleCartVisibility = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleCartVisibility}>
            <ShoppingIcon />
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon