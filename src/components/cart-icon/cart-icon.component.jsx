import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles'
import {useDispatch, useSelector} from 'react-redux'
import {setIsCartOpen} from '../../store/cart/cart.action'
import {selectCartItemCount, selectIsCartOpen} from '../../store/cart/cart.selector'

const CartIcon = () => {
    const cartItemCount = useSelector(selectCartItemCount)
    const isCartOpen = useSelector(selectIsCartOpen)

    const dispatch = useDispatch()
    const toggleCartVisibility = () => dispatch(setIsCartOpen(!isCartOpen))

    return (
        <CartIconContainer onClick={toggleCartVisibility}>
            <ShoppingIcon />
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon