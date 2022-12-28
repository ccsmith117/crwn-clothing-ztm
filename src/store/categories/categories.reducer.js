import {CATEGORIES_TYPES} from './categories.types'

export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch (type) {
        case CATEGORIES_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state,
                categoriesMap: payload
            }
        default:
            return state
    }
}

const INITIAL_STATE = {
    categoriesMap: {}
}