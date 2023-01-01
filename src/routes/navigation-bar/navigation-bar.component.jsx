import {Outlet} from 'react-router-dom'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {signOutUser} from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {LogoContainer, NavigationBarContainer, NavigationLink, NavigationLinksContainer} from './navigation-bar.styles'
import {useSelector} from 'react-redux'
import {selectCurrentUser} from '../../store/user/user.selector'
import {selectIsCartOpen} from '../../store/cart/cart.selector'

const NavigationBar = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    return (
        <>
            <NavigationBarContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavigationLinksContainer>
                    <NavigationLink to='/shop'>
                        SHOP
                    </NavigationLink>
                    {
                        currentUser.uid ?
                            <NavigationLink
                                as='span'
                                className='nav-link'
                                onClick={signOutUser}
                            >
                                SIGN OUT
                            </NavigationLink>
                            :
                            <NavigationLink to='/auth'>
                                SIGN IN
                            </NavigationLink>
                    }
                    <CartIcon />
                </NavigationLinksContainer>
            </NavigationBarContainer>
            {isCartOpen && <CartDropdown/>}
            <Outlet />
        </>
    )
}

export default NavigationBar