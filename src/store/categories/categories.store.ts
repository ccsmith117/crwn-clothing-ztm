import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { startListening } from '../listener-middleware'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { RootState } from '../store'
import { createSelector } from 'reselect'

export type CategoryItem = {
    id: number
    imageUrl: string
    name: string
    price: number
}
export type Category = {
    id: number
    title: string
    imageUrl: string
    items: CategoryItem[]
}
export type CategoryMap = {
    [key: string]: CategoryItem[]
}

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
        fetchCategoriesStarted(state) {
            state.isLoading = true
        },
        fetchCategoriesSucceeded(state, action: PayloadAction<Category[]>) {
            state.isLoading = false
            state.categories = action.payload
        },
        fetchCategoriesFailed(state, action: PayloadAction<Error>) {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export const categoriesReducer = categoriesSlice.reducer

export const { fetchCategoriesStarted } = categoriesSlice.actions

const { fetchCategoriesSucceeded, fetchCategoriesFailed } =
    categoriesSlice.actions

startListening({
    actionCreator: fetchCategoriesStarted,
    effect: async (action, listenerApi) => {
        try {
            const categoriesAndDocuments = await getCategoriesAndDocuments()
            listenerApi.dispatch(
                fetchCategoriesSucceeded(categoriesAndDocuments)
            )
        } catch (error) {
            listenerApi.dispatch(fetchCategoriesFailed(error as Error))
        }
    },
})

export const selectCategoryState = (state: RootState): CategoriesState =>
    state.categories

export const selectCategories = createSelector(
    [selectCategoryState],
    (categories) => categories.categories
)
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categoriesSlice): CategoryMap =>
        categoriesSlice.reduce((accumulator, category) => {
            const { title, items } = category
            accumulator[title.toLowerCase()] = items
            return accumulator
        }, {} as CategoryMap)
)
export const selectCategoriesIsLoading = createSelector(
    [selectCategoryState],
    (categories) => categories.isLoading
)
