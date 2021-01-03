import * as actions from '../action/action';

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    path: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userID,
                loading: false
            };
        case actions.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actions.LOG_OUT:
            return {
                ...state,
                token: null,
                userID: null
            };
        case actions.SET_AUTH_PATH:
            return {
                ...state,
                path: action.path
            }
        default:
            return state;
    }
}

export default reducer;