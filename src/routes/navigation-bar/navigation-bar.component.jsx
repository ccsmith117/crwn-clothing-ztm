import {Link, Outlet} from 'react-router-dom'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'

import './navigation-bar.styles.scss'

const NavigationBar = () => {
    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                </div>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/sign-up'>
                        SIGN UP
                    </Link>
                </div>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/sign-in'>
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default NavigationBar