import './checkout-item.styles.scss'
import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem
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
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <div className='arrow' onClick={decreaseCartItem}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseCartItem}>&#10095;</div>
            </div>
            <span className='price'>{quantity * price}</span>
            <div className='remove-button' onClick={removeItemFromCart}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem