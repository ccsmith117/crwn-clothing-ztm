import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'
import {
    CheckoutItemContainer,
    ImageContainer,
    ItemImage,
    Name,
    Price,
    Quantity,
    QuantityArrow,
    QuantityContainer,
    RemoveButton
} from './checkout-item.styles'

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
        <CheckoutItemContainer>
            <ImageContainer>
                <ItemImage src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name>{name}</Name>
            <QuantityContainer>
                <QuantityArrow onClick={decreaseCartItem}>&#10094;</QuantityArrow>
                <Quantity>{quantity}</Quantity>
                <QuantityArrow onClick={increaseCartItem}>&#10095;</QuantityArrow>
            </QuantityContainer>
            <Price>{quantity * price}</Price>
            <RemoveButton onClick={removeItemFromCart}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem