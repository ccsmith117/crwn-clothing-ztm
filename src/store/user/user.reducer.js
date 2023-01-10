import {USER_ACTION_TYPES} from './user.types'

export const userReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action

    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
                isLoading: false
            }
        case USER_ACTION_TYPES.SIGN_IN_FAILURE:
        case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
        case USER_ACTION_TYPES.SIGN_UP_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: {},
                isLoading: false
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
