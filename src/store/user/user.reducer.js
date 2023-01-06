import {USER_ACTION_TYPES} from './user.types'

export const userReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action

    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            }
        case USER_ACTION_TYPES.SIGN_IN_FAILURE:
            return {
                ...state,
                error: payload
            }
        default:
            return state
    }
}

const INITIAL_STATE = {
    currentUser: {},
    isLoading: false,
    error: null
}
