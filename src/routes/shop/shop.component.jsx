import {useContext} from 'react'
import {ProductsContext} from '../../context/products.context'
import Product from '../../components/product/product.component'
import './shop.styles.scss'

const Shop = () => {
    const {products} = useContext(ProductsContext)
    console.log(products)

    return (
        <div className='products-container'>
            { products.map((product) => <Product key={product.id} product={product} />) }
        </div>
    )
}

export default Shop