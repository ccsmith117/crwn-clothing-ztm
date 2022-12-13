import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'
import {useNavigate} from 'react-router-dom'

const CartDropdown = () => {
    const {cartItems, setIsCartOpen} = useContext(CartContext)
    const navigate = useNavigate()

    const gotToCheckout = () => {
        navigate('/checkout')
        setIsCartOpen(false)
    }

    return <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {
                cartItems.length > 0 ?
                    cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem}/>)
                    :
                    <span className='empty-message'>Your cart is empty :(</span>
            }
        </div>
        <Button onClick={gotToCheckout}>CHECKOUT</Button>
    </div>
}

export default CartDropdown