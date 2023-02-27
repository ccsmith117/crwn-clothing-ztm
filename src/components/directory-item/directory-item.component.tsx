import {
    DescriptionContainer,
    DirectoryItemBackgroundImage,
    DirectoryItemContainer,
    ShopNow,
    Title,
} from './directory-item.styles'
import { Category } from '../../store/categories/categories.store'

type DirectoryItemProps = {
    category: Category
}

const DirectoryItem = ({
    category: { imageUrl, title },
}: DirectoryItemProps) => {
    return (
        <DirectoryItemContainer to={`shop/${title.toLowerCase()}`}>
            <DirectoryItemBackgroundImage imageUrl={imageUrl} />
            <DescriptionContainer>
                <Title>{title}</Title>
                <ShopNow>Shop Now</ShopNow>
            </DescriptionContainer>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem
