import {useContext} from 'react'
import {ProductsContext} from '../../context/products.context'

const Shop = () => {
    const {products} = useContext(ProductsContext)
    console.log(products)

    return (
        <div>
            {
                products.map((product) =>
                    <div key={product.id}>
                        <h1>{product.name}</h1>
                        <p>{product.price}</p>
                    </div>)
            }
        </div>
    )
}

export default Shop