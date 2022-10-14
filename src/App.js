import {Route, Routes} from 'react-router-dom'
import NavigationBar from './routes/navigation-bar/navigation-bar.component'
import Home from './routes/home/home.component'
import SignIn from './routes/sign-in/sign-in.component'
import SignUpForm from './components/sign-up/sign-up.component'

const Shop = () => {
    return (<div>Shopping time</div>)
}

const App = () => {
  return (
      <Routes>
          <Route path='/' element={<NavigationBar />}>
              <Route index element={<Home />}/>
              <Route path='shop' element={<Shop />}/>
              <Route path='sign-in' element={<SignIn />}/>
              <Route path='sign-up' element={<SignUpForm />}/>
          </Route>
      </Routes>
  )
}

export default App
