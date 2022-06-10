import {
    Arrow,
    CheckoutItemContainer,
    Column,
    ImageColumn,
    ImageColumnContainer,
    Quantity,
    QuantityColumnContainer,
    RemoveButton
} from './checkout-item.styles'
import {useDispatch, useSelector} from 'react-redux'
import {addItemToCart, clearItemFromCart, removeItemFromCart} from '../../store/cart/cart.action'
import {selectCartItems} from '../../store/cart/cart.selector'

const CheckoutItem = ({cartItem}) => {
    const { imageUrl, name, price, quantity } = cartItem
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const increaseQuantityHandler = () => dispatch(addItemToCart(cartItems, cartItem))
    const decreaseQuantityHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))
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