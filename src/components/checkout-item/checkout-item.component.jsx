import {useContext} from 'react'
import {CartContext} from '../../contexts/cart.context'
import {
    Arrow,
    CheckoutItemContainer,
    Column, ImageColumn,
    ImageColumnContainer,
    Quantity,
    QuantityColumnContainer,
    RemoveButton
} from './checkout-item.styles'

const CheckoutItem = ({cartItem}) => {
    const { imageUrl, name, price, quantity } = cartItem
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)
    const increaseQuantityHandler = () => addItemToCart(cartItem)
    const decreaseQuantityHandler = () => removeItemFromCart(cartItem)
    const clearItemHandler = () => clearItemFromCart(cartItem)
    return (
        <CheckoutItemContainer>
            <ImageColumnContainer>
                <ImageColumn src={imageUrl} alt={`${name}`} />
            </ImageColumnContainer>
            <Column>{name}</Column>
            <QuantityColumnContainer>
                <Arrow onClick={decreaseQuantityHandler}>&#10094;</Arrow>
                <Quantity>{quantity}</Quantity>
                <Arrow onClick={increaseQuantityHandler}>&#10095;</Arrow>
            </QuantityColumnContainer>
            <Column>${price}</Column>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )}

export default CheckoutItem