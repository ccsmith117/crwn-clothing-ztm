import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Product from '../../components/product/product.component'
import {CategoryContainer, CategoryTitle} from './category.styles'
import {useSelector} from 'react-redux'
import {selectCategoriesMap} from '../../store/categories/categories.selector'

const Category = () => {
    const {category} = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products && products.map((product) => <Product key={product.id} product={product} />)
                }
            </CategoryContainer>
        </>
    )
}

export default Category