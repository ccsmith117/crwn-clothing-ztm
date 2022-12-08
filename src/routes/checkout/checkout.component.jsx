import './checkout.styles.scss'
import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

const Checkout = () => {
    const {cartItems, cartTotalPrice} = useContext(CartContext)

    return (
        <div>
            <div className='checkoutGridHeader'>
                <span>Product</span>
                <span>Description</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Remove</span>
            </div>
            {cartItems.map((cartItem) =>
                <CheckoutItem cartItem={cartItem} />
            )}
            <span>TOTAL: {cartTotalPrice}</span>
        </div>
    )
}

export default Checkout