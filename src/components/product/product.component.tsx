import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import {
    Footer,
    ProductCardContainer,
    ProductImage,
    ProductName,
    ProductPrice,
} from './product.styles'
import { useDispatch } from 'react-redux'
import { cartItemAdded } from '../../store/cart/cart.store'

export type Product = {
    id: number
    name: string
    price: number
    imageUrl: string
}

type ProductProps = {
    product: Product
}

const ProductComponent = ({ product }: ProductProps) => {
    const { name, price, imageUrl } = product
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(cartItemAdded(product))
    }

    return (
        <ProductCardContainer>
            <ProductImage src={imageUrl} alt={`${name}`} />
            <Footer>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
            </Footer>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addToCart}
            >
                Add to cart
            </Button>
        </ProductCardContainer>
    )
}

export default ProductComponent
