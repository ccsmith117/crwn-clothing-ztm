import { Routes, Route } from 'react-router-dom'

import Home from "./routes/home/home.component";

const App = () => {
    return (
        <Routes>
            <Route path='/home' element={<Home/>}>
                <Route path='shop' element={<h1>I am the shop page</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
