import {createSelector} from 'reselect'

const selectCategoryState = (state) => state.categories

const selectCategories = createSelector([selectCategoryState], (categories) => categories.categories)

export const selectCategoriesMap = createSelector([selectCategories],(categoriesSlice) => categoriesSlice.reduce((accumulator, category) => {
        const {title, items} = category
        accumulator[title.toLowerCase()] = items
        return accumulator
    }, {})
)
