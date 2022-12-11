import {useContext} from 'react'
import {CategoriesContext} from '../../context/categories.context'
import Product from '../../components/product/product.component'
import './shop.styles.scss'

const Shop = () => {
    const {categoriesMap} = useContext(CategoriesContext)

    return (
        <>
            {
                Object.keys(categoriesMap).map((title) =>
                    <div key={title}>
                        <h2>{title}</h2>
                        <div className='products-container'>
                            { categoriesMap[title].map((product) => <Product key={product.id} product={product} />) }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Shop