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
import {selectCartItems} from '../../store/cart/cart.selector'
import {useDispatch, useSelector} from 'react-redux'
import {decreaseCartItemQuantity, increaseCartItemQuantity, removeItemFromCart} from '../../store/cart/cart.action'
import {CartItem} from "../../store/cart/cart.types";

type CheckoutItemProps = {
    cartItem: CartItem
}

const CheckoutItem = ({cartItem}: CheckoutItemProps) => {
    const {name, imageUrl, price, quantity, id} = cartItem
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()

    const decreaseCartItem = () => dispatch(decreaseCartItemQuantity(cartItems, id))
    const increaseCartItem = () => dispatch(increaseCartItemQuantity(cartItems, id))
    const removeFromCart = () => dispatch(removeItemFromCart(cartItems, id))

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
            <RemoveButton onClick={removeFromCart}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem