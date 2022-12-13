import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'
import {useNavigate} from 'react-router-dom'
import {CartDropdownContainer, CartItemsContainer, EmptyMessage} from './cart-dropdown.styles'

const CartDropdown = () => {
    const {cartItems, setIsCartOpen} = useContext(CartContext)
    const navigate = useNavigate()

    const gotToCheckout = () => {
        navigate('/checkout')
        setIsCartOpen(false)
    }

    const CartItems = () => {
        return (
            <>
                {
                    cartItems.length > 0 ?
                        cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem}/>)
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
            <Button onClick={gotToCheckout}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown