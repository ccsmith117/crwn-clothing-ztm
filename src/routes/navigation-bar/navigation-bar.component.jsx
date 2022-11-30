import {Link, Outlet} from 'react-router-dom'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {useContext} from 'react'
import {UserContext} from '../../context/user.context'
import {signOutUser} from '../../utils/firebase/firebase.utils'

import './navigation-bar.styles.scss'

const NavigationBar = () => {
    const {currentUser} = useContext(UserContext)

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
                {currentUser ?
                    <div className='nav-links-container'>
                        <span className='nav-link' onClick={signOutUser}>
                            SIGN OUT
                        </span>
                    </div>
                    :
                    <div className='nav-links-container'>
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    </div>
                }
            </div>
            <Outlet />
        </>
    )
}

export default NavigationBar