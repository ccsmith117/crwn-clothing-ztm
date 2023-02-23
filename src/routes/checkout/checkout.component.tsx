import './checkout.styles'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {CheckoutContainer, CheckoutHeaderContainer, EmptyCartMessage, HeaderBlock, Total} from './checkout.styles'
import {useSelector} from 'react-redux'
import PaymentForm from '../../components/payment-form/payment-form.component'
import {CartItem, selectCartItems, selectCartTotalPrice} from '../../store/cart/cart.store'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalPrice = useSelector(selectCartTotalPrice)

    return (
        <CheckoutContainer>
            <CheckoutHeaderContainer>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeaderContainer>
            {cartItems.length === 0 && <EmptyCartMessage>Your cart is empty!  Find something to put in it. :)</EmptyCartMessage>}
            {cartItems.map((cartItem: CartItem) =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <Total>{`Total: ${cartTotalPrice}`}</Total>
            <PaymentForm />
        </CheckoutContainer>
    )
}

export default Checkout