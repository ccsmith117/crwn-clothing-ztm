import {Route, Routes} from 'react-router-dom'
import NavigationBar from './routes/navigation-bar/navigation-bar.component'
import Home from './routes/home/home.component'

const Shop = () => {
    return (<div>Shopping time</div>)
}

const App = () => {
  return (
      <Routes>
          <Route path='/' element={<NavigationBar />}>
              <Route path='' element={<Home />}/>
              <Route path='shop' element={<Shop />}/>
          </Route>
      </Routes>
  )
}

export default App
