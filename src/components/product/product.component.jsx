import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {Footer, ProductCardContainer, ProductImage, ProductName, ProductPrice} from './product-card.styles'
import {useDispatch, useSelector} from 'react-redux'
import {selectCartItems} from '../../store/cart/cart.selector'
import {addProductToCart} from '../../store/cart/cart.action'

const Product = ({ product }) => {
    const { name, price, imageUrl } = product
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(addProductToCart(cartItems, product))
    }

    return (
        <ProductCardContainer>
            <ProductImage src={imageUrl} alt={`${name}`} />
            <Footer>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCart}>
                Add to cart
            </Button>
        </ProductCardContainer>
    )
}

export default Product