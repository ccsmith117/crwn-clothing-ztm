import './category-preview.styles.scss'
import Product from '../product/product.component'
import {Link} from 'react-router-dom'

const CategoryPreview = ({title, products}) => {
    return (<div className='category-preview-container'>
        <h2>
            <Link className='title' to={`/shop/${title}`}>
                {title.toUpperCase()}
            </Link>
        </h2>
        <div className='preview'>
            {
                products.slice(0, 4)
                    .map((product) => <Product key={product.id} product={product} />)
            }
        </div>
    </div>)
}

export default CategoryPreview