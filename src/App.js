import {Route, Routes} from 'react-router-dom'
import Home from './routes/home/home.component'

const App = () => {
  return (
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<div>Whoops- wrong spot.  Go to <a href={'/home'}>/home</a></div>} />
      </Routes>
  )
}

export default App
