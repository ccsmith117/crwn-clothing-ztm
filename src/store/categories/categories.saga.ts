import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'
import {fetchCategoriesFail, fetchCategoriesSuccess} from './categories.action'
import {all, call, put, takeLatest} from 'typed-redux-saga/macro'
import {CATEGORIES_ACTION_TYPES} from './categories.types'

function* fetchCategories() {
    try {
        const categories = yield* call(getCategoriesAndDocuments)
        yield* put(fetchCategoriesSuccess(categories))
    } catch (error) {
        yield* put(fetchCategoriesFail(error as Error))
    }
}

function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategories)
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)])
}