import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import {useContext} from 'react'
import {CartContext} from '../../contexts/cart.context'
import {useNavigate} from 'react-router-dom'
import {CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles'

const CartDropdown = () => {
    const { cartItems, setIsCartOpen } = useContext(CartContext)
    const navigate = useNavigate()
    const goToCheckoutHandler = () => {
        navigate('/checkout')
        setIsCartOpen(false)
    }
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ?
                    cartItems.map((cartItem) =>
                        (<CartItem key={cartItem.id} cartItem={cartItem}/>)
                    )
                    :
                    <EmptyMessage>Please fill!</EmptyMessage>
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown