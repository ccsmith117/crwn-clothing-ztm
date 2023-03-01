import { Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {
    LogoContainer,
    NavigationBarContainer,
    NavigationLink,
    NavigationLinksContainer,
} from './navigation-bar.styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsCartOpen } from '../../store/cart/cart.store'
import {
    selectCurrentUser,
    signOutStarted,
} from '../../store/user/user.reducer'

const NavigationBar = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    const dispatch = useDispatch()
    const signOutUser = () => dispatch(signOutStarted())

    return (
        <>
            <NavigationBarContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavigationLinksContainer>
                    <NavigationLink to="/shop">SHOP</NavigationLink>
                    {currentUser.email ? (
                        <NavigationLink
                            as="span"
                            className="nav-link"
                            onClick={signOutUser}
                        >
                            SIGN OUT
                        </NavigationLink>
                    ) : (
                        <NavigationLink to="/auth">SIGN IN</NavigationLink>
                    )}
                    <CartIcon />
                </NavigationLinksContainer>
            </NavigationBarContainer>
            {isCartOpen && <CartDropdown />}
            <Outlet />
        </>
    )
}

export default NavigationBar
