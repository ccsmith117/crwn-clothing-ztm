import {Route, Routes} from 'react-router-dom'
import NavigationBar from './routes/navigation-bar/navigation-bar.component'
import Home from './routes/home/home.component'
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {checkUserSession} from './store/user/user.action'
import {fetchCategoriesStart} from './store/categories/categories.action'
import {GlobalStyles} from './global.styles'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkUserSession())
        dispatch(fetchCategoriesStart())
    })

    return (
        <>
            <GlobalStyles />
            <Routes>
                <Route path='/' element={<NavigationBar />}>
                    <Route index element={<Home />}/>
                    <Route path='shop/*' element={<Shop />}/>
                    <Route path='auth' element={<Authentication />}/>
                    <Route path='checkout' element={<Checkout />}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
