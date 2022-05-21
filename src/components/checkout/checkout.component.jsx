import {useContext} from 'react'
import {CartContext} from '../../contexts/cart.context'
import CheckoutItem from '../checkout-item/checkout-item.component'
import {CheckoutContainer, CheckoutHeader, CheckoutHeaderContainer, Total} from './checkout.styles'

const Checkout = () => {
    const { cartItems, cartPrice } = useContext(CartContext)
    return (
        <CheckoutContainer>
            <CheckoutHeaderContainer>
                <CheckoutHeader>
                    <span>Product</span>
                </CheckoutHeader>
                <CheckoutHeader>
                    <span>Description</span>
                </CheckoutHeader>
                <CheckoutHeader>
                    <span>Quantity</span>
                </CheckoutHeader>
                <CheckoutHeader>
                    <span>Price</span>
                </CheckoutHeader>
                <CheckoutHeader>
                    <span>Remove</span>
                </CheckoutHeader>
            </CheckoutHeaderContainer>
            {cartItems.map((cartItem) =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>
            )}
            <Total>Total: ${cartPrice}</Total>
        </CheckoutContainer>
    )
}

export default Checkout