import CheckoutItem from '../checkout-item/checkout-item.component'
import {CheckoutContainer, CheckoutHeader, CheckoutHeaderContainer, Total} from './checkout.styles'
import {useSelector} from 'react-redux'
import {selectCartItems, selectCartPriceTotal} from '../../store/cart/cart.selector'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartPrice = useSelector(selectCartPriceTotal)
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