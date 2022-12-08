import './checkout-item.styles.scss'
import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'

const CheckoutItem = ({cartItem}) => {
    const {decreaseCartItemQuantity, increaseCartItemQuantity, removeCartItem} = useContext(CartContext)

    const decreaseCartItem = () => {
        decreaseCartItemQuantity(cartItem)
    }

    const increaseCartItem = () => {
        increaseCartItemQuantity(cartItem)
    }

    const removeItemFromCart = () => {
        removeCartItem(cartItem)
    }

    return (
        <div className='checkoutGridHeader'>
            <img src={cartItem.imageUrl} alt={`${cartItem.name}`} />
            <span>{cartItem.name}</span>
            <div>
                <button onClick={decreaseCartItem}>{'<'}</button>
                {cartItem.quantity}
                <button onClick={increaseCartItem}>{'>'}</button>
            </div>
            <span>{cartItem.quantity * cartItem.price}</span>
            <button onClick={removeItemFromCart}>X</button>
        </div>
    )
}

export default CheckoutItem