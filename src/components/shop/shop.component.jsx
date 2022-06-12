import CategoriesPreview from '../../routes/categories-preview/categories-preview.component'
import {Route, Routes} from 'react-router-dom'
import Category from '../../routes/category/category.component'
import {useEffect} from 'react'
import {fetchCategoriesAsync} from '../../store/categories/categories.action'
import {useDispatch} from 'react-redux'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoriesAsync())
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":category" element={<Category />}/>
        </Routes>
    )
}

export default Shop