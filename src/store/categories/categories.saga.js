import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'
import {fetchCategoriesFailed, fetchCategoriesSuccess} from './categories.action'
import {all, call, put, takeLatest} from 'redux-saga/effects'
import {CATEGORIES_ACTION_TYPES} from './categories.types'

function* fetchCategories() {
    try {
        const categories = yield call(getCategoriesAndDocuments, 'categories')
        yield put(fetchCategoriesSuccess(categories))
    } catch (error) {
        yield put(fetchCategoriesFailed(error))
    }
}

function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategories)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}