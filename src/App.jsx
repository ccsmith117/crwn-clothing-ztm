import {Route, Routes} from 'react-router-dom'
import NavigationBar from './routes/navigation-bar/navigation-bar.component'
import Home from './routes/home/home.component'
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'
import {setCurrentUser} from './store/user/user.action'
import {useEffect} from 'react'
import {
    createUserDocumentFromAuth,
    getCategoriesAndDocuments,
    onAuthStateChangeListener
} from './utils/firebase/firebase.utils'
import {useDispatch} from 'react-redux'
import {setCategoriesMap} from './store/categories/categories.action'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        return onAuthStateChangeListener(async (user) => {
            await createUserDocumentFromAuth(user)
            dispatch(setCurrentUser(user || {}))
        })
    }, [])


    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            dispatch(setCategoriesMap(categoryMap))
        }
        getCategoriesMap()
    }, [])

    return (
        <Routes>
            <Route path='/' element={<NavigationBar />}>
                <Route index element={<Home />}/>
                <Route path='shop/*' element={<Shop />}/>
                <Route path='auth' element={<Authentication />}/>
                <Route path='checkout' element={<Checkout />}/>
            </Route>
        </Routes>
    )
}

export default App
