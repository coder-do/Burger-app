import * as action from './action';

export const authStart = () => {
    return {
        type: action.AUTH_START
    };
};

export const authSuccess = (token, userID) => {
    return {
        type: action.AUTH_SUCCESS,
        idToken: token,
        userID: userID
    };
};

export const authFailed = error => {
    return {
        type: action.AUTH_FAILED,
        error: error
    };
};

export const logOut = () => {
    return {
        type: action.SAGA_LOGOUT
    }
};

export const chechAuthTime = time => {
    return {
        type: action.CHECK_AUTH_TIMEOUT,
        time: time
    };
};

export const auth = (email, password, method) => {
    return {
        type: action.AUTH_USER_SAGA,
        email: email,
        password: password,
        method: method
    }
};

export const setAuthRedirect = path => {
    return {
        type: action.SET_AUTH_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return {
        type: action.CHECK_AUTH_STATE
    };
};