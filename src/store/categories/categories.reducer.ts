import { Category } from './categories.types'
import { AnyAction } from 'redux'
import {
    fetchCategoriesFail,
    fetchCategoriesStart,
    fetchCategoriesSuccess,
} from './categories.action'
import { createSlice } from '@reduxjs/toolkit'

export type CategoriesState = {
    readonly categories: Category[]
    readonly isLoading: boolean
    readonly error: Error | null
}

const INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: INITIAL_STATE,
    reducers: {
        testReducer(state, action) {},
    },
})

export const categoriesReducer = (
    state = INITIAL_STATE,
    action: AnyAction
): CategoriesState => {
    if (fetchCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            categories: action.payload,
        }
    }

    if (fetchCategoriesFail.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: action.payload,
        }
    }

    return state
}
