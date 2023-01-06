import CategoriesPreview from '../categories-preview/categories-preview.component'
import {Route, Routes} from 'react-router-dom'
import Category from '../category/category.component'
import {useEffect} from 'react'
import {fetchCategoriesStart} from '../../store/categories/categories.action'
import {useDispatch} from 'react-redux'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoriesStart())
    })

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

export default Shop