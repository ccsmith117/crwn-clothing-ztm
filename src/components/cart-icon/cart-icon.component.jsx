import './cart-icon.styles.scss'
import {ReactComponent as ShoppingBag} from '../../assets/shopping-bag.svg'
import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext)
    const toggleCartVisibility = () => setIsCartOpen(!isCartOpen)

    return (
        <div className='cart-icon-container' onClick={toggleCartVisibility}>
            <ShoppingBag className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon