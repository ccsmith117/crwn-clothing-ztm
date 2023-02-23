import Button from '../button/button.component'
import CartItemComponent from '../cart-item/cart-item.component'
import {useNavigate} from 'react-router-dom'
import {CartDropdownContainer, CartItemsContainer, EmptyMessage} from './cart-dropdown.styles'
import {useDispatch, useSelector} from 'react-redux'
import {selectCartItems, toggledCartOpen} from '../../store/cart/cart.store'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goToCheckout = () => {
        navigate('/checkout')
        dispatch(toggledCartOpen(false))
    }

    const CartItems = () => {
        return (
            <>
                {
                    cartItems.length ?
                        cartItems.map((cartItem) => <CartItemComponent key={cartItem.id} cartItem={cartItem}/>)
                        :
                        <EmptyMessage>Your cart is empty :(</EmptyMessage>
                }
            </>
        )
    }

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                <CartItems />
            </CartItemsContainer>
            <Button onClick={goToCheckout}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown