import {Route, Routes} from 'react-router-dom'
import NavigationBar from './routes/navigation-bar/navigation-bar.component'
import Home from './routes/home/home.component'
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'

const App = () => {
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