import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles'
import {useDispatch, useSelector} from 'react-redux'
import {selectCartItemCount, selectIsCartOpen, toggledCartOpen} from "../../store/cart/cart.store";

const CartIcon = () => {
    const cartItemCount = useSelector(selectCartItemCount)
    const isCartOpen = useSelector(selectIsCartOpen)

    const dispatch = useDispatch()
    const toggleCartVisibility = () => dispatch(toggledCartOpen(!isCartOpen))

    return (
        <CartIconContainer onClick={toggleCartVisibility}>
            <ShoppingIcon />
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon