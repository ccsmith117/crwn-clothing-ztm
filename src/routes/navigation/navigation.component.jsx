import {Outlet} from 'react-router-dom'
import {Fragment} from 'react'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'

import {signOutUser} from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {LogoContainer, NavigationContainer, NavigationLink, NavigationLinksContainer} from './navigation.styles'
import {useSelector} from 'react-redux'
import {selectCurrentUser} from '../../store/user/user.selector'
import {selectIsCartOpen} from '../../store/cart/cart.selector'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    const signOutHandler = async () => {
        await signOutUser();
    }
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavigationLinksContainer>
                    <NavigationLink to='/shop'>
                        SHOP
                    </NavigationLink>
                    {
                        currentUser ? (
                            <NavigationLink as='span'
                                onClick={ signOutHandler }
                            >
                                SIGN OUT
                            </NavigationLink>
                        ) : (
                            <NavigationLink to='/auth'>
                                SIGN IN
                            </NavigationLink>
                        )
                    }
                    <CartIcon />
                </NavigationLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation