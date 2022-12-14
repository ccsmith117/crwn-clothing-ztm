import './cart-item.styles'
import {CartItemContainer, ItemDetails, ItemImage, ItemName} from './cart-item.styles'

const CartItem = ({cartItem}) => {
    const {imageUrl, name, price, quantity} = cartItem
    return (
        <CartItemContainer>
            <ItemImage src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <ItemName>{name}</ItemName>
                <span>{`${quantity} x $${price}`}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem