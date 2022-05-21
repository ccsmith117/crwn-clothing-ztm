import ProductCard from '../product-card/product-card.component'
import {CategoryPreviewContainer, CategoryTitle, ProductPreviewContainer} from './category-preview.styles'

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
            </h2>
            <ProductPreviewContainer>
                {products.filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        ></ProductCard>
                    ))
                }
            </ProductPreviewContainer>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview