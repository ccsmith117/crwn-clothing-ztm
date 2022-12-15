import DirectoryItem from '../directory-item/directory-item.component'
import {DirectoryItemContainer} from './directory-container.styles'

const DirectoryContainer = ({categories}) => {
    return (
        <DirectoryItemContainer>
            {
                categories.map((category) =>
                    <DirectoryItem key={category.id} category={category} />)
            }
        </DirectoryItemContainer>
    )
}

export default DirectoryContainer