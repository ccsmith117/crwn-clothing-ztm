import {createSelector} from 'reselect'
import {CategoriesState} from "./categories.reducer";
import {CategoryMap} from "./categories.types";
import {RootState} from "../store";

const selectCategoryState = (state: RootState): CategoriesState => state.categories

export const selectCategories = createSelector([selectCategoryState], (categories) => categories.categories)

export const selectCategoriesMap = createSelector([selectCategories],(categoriesSlice): CategoryMap => categoriesSlice.reduce((accumulator, category) => {
        const {title, items} = category
        accumulator[title.toLowerCase()] = items
        return accumulator
    }, {} as CategoryMap)
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryState],
    (categories) => categories.isLoading
)