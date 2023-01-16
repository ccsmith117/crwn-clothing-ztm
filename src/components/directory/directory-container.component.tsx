import DirectoryItem from '../directory-item/directory-item.component'
import {DirectoryItemContainer} from './directory-container.styles'
import {useSelector} from "react-redux";
import {selectCategories} from "../../store/categories/categories.selector";

const DirectoryContainer = () => {
    const categories = useSelector(selectCategories)
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