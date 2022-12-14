import Product from '../product/product.component'
import {CategoryPreviewContainer, PreviewContainer, TitleLink} from './category-preview.styles'

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <TitleLink to={`/shop/${title}`}>
                    {title.toUpperCase()}
                </TitleLink>
            </h2>
            <PreviewContainer>
                {
                    products.slice(0, 4)
                        .map((product) => <Product key={product.id} product={product} />)
                }
            </PreviewContainer>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview