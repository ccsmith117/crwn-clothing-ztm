import {useParams} from 'react-router-dom'
import {CategoriesContext} from '../../context/categories.context'
import {useContext, useEffect, useState} from 'react'
import Product from '../../components/product/product.component'
import {CategoryContainer, CategoryTitle} from './category.styles'

const Category = () => {
    const { category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext)
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