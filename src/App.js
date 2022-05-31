import {Route, Routes} from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import AuthenticationComponent from './routes/authentication/authentication.component'
import Shop from './components/shop/shop.component'
import Checkout from './components/checkout/checkout.component'
import {useEffect} from 'react'
import {createUserDocumentFromAuth, onAuthStateChangedListener} from './utils/firebase/firebase.utils'
import {setCurrentUser} from './store/user/user.action'
import {useDispatch} from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        return onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            dispatch(setCurrentUser(user))
        })
    }, [])

    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop/*' element={<Shop />} />
                <Route path='auth' element={<AuthenticationComponent />} />
                <Route path='checkout' element={<Checkout />} />
            </Route>
        </Routes>
    );
}

export default App;
