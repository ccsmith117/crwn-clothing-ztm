import ProductComponent, { Product } from '../product/product.component'
import {
    CategoryPreviewContainer,
    PreviewContainer,
    TitleLink,
} from './category-preview.styles'

type CategoryPreviewProps = {
    title: string
    products: Product[]
}

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <TitleLink to={`/shop/${title}`}>
                    {title.toUpperCase()}
                </TitleLink>
            </h2>
            <PreviewContainer>
                {products.slice(0, 4).map((product) => (
                    <ProductComponent key={product.id} product={product} />
                ))}
            </PreviewContainer>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview
