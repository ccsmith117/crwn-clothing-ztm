import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'
import {Footer, ProductCardContainer, ProductImage, ProductName, ProductPrice} from './product-card.styles'

const Product = ({ product }) => {
    const { name, price, imageUrl } = product
    const {addProductToCart} = useContext(CartContext)

    const addToCart = () => addProductToCart(product)

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