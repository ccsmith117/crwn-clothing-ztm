import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles'
import {selectCartItemQuantity, selectIsCartOpen} from '../../store/cart/cart.selector'
import {useDispatch, useSelector} from 'react-redux'
import {setIsCartOpen} from '../../store/cart/cart.action'

const CartIcon = () => {
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartItemCount = useSelector(selectCartItemQuantity)
    console.log(isCartOpen)

    const toggleIsCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen))
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon