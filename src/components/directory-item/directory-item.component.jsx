import {
    DescriptionContainer,
    DirectoryItemBackgroundImage,
    DirectoryItemContainer,
    ShopNow,
    Title
} from './directory-item.styles'

const DirectoryItem = (props) => {
    const {category} = props
    const {imageUrl, title} = category
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