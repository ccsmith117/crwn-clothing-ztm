import {
    CheckoutItemContainer,
    ImageContainer,
    ItemImage,
    Name,
    Price,
    Quantity,
    QuantityArrow,
    QuantityContainer,
    RemoveButton,
} from './checkout-item.styles'
import { useDispatch } from 'react-redux'
import {
    CartItem,
    cartItemQuantityDecreasedByOne,
    cartItemQuantityIncreasedByOne,
    cartItemRemoved,
} from '../../store/cart/cart.store'

type CheckoutItemProps = {
    cartItem: CartItem
}

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
    const { name, imageUrl, price, quantity, id } = cartItem
    const dispatch = useDispatch()

    const decreaseCartItem = () => dispatch(cartItemQuantityDecreasedByOne(id))
    const increaseCartItem = () => dispatch(cartItemQuantityIncreasedByOne(id))
    const removeFromCart = () => dispatch(cartItemRemoved(id))

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <ItemImage src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name>{name}</Name>
            <QuantityContainer>
                <QuantityArrow onClick={decreaseCartItem}>
                    &#10094;
                </QuantityArrow>
                <Quantity>{quantity}</Quantity>
                <QuantityArrow onClick={increaseCartItem}>
                    &#10095;
                </QuantityArrow>
            </QuantityContainer>
            <Price>{quantity * price}</Price>
            <RemoveButton onClick={removeFromCart}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem
