import {useParams} from 'react-router-dom'
import './category.styles.scss'
import {CategoriesContext} from '../../context/categories.context'
import {useContext, useEffect, useState} from 'react'
import Product from '../../components/product/product.component'

const Category = () => {
    const { category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <div className='category-container'>
            {
                products && products.map((product) => <Product key={product.id} product={product} />)
            }
        </div>
    )
}

export default Category