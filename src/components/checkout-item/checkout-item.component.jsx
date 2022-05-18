
import './checkout-item.styles.scss'
import {useContext} from 'react'
import {CartContext} from '../../contexts/cart.context'

const CheckoutItem = ({cartItem}) => {
    const { imageUrl, name, price, quantity } = cartItem
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)
    const increaseQuantityHandler = () => addItemToCart(cartItem)
    const decreaseQuantityHandler = () => removeItemFromCart(cartItem)
    const clearItemHandler = () => clearItemFromCart(cartItem)
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <div
                    className='arrow'
                    onClick={decreaseQuantityHandler}
                >
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div
                    className='arrow'
                    onClick={increaseQuantityHandler}
                >
                    &#10095;
                </div>
            </div>
            <span className='price'>{price}</span>
            <div
                className='remove-button'
                onClick={clearItemHandler}
            >
                &#10005;
            </div>
        </div>
    )}

export default CheckoutItem