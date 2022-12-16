import './checkout.styles'
import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {CheckoutContainer, CheckoutHeaderContainer, EmptyCartMessage, Total} from './checkout.styles'

const Checkout = () => {
    const {cartItems, cartTotalPrice} = useContext(CartContext)

    return (
        <CheckoutContainer>
            <CheckoutHeaderContainer>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </CheckoutHeaderContainer>
            {cartItems.length === 0 && <EmptyCartMessage>Your cart is empty!  Find something to put in it. :)</EmptyCartMessage>}
            {cartItems.map((cartItem) =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <Total>Total: ${cartTotalPrice}</Total>
        </CheckoutContainer>
    )
}

export default Checkout