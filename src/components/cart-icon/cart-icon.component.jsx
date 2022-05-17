import {ReactComponent as BagIcon} from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'
import {useContext} from 'react'
import {CartContext} from '../../contexts/cart.context'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext)

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <BagIcon className='item-count' />
            <span>0</span>
        </div>
    )
}

export default CartIcon