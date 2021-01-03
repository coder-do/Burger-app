import { delay } from 'redux-saga/effects';
import { authStart, authSuccess, chechAuthTime, authFailed } from '../action/auth';
import * as actions from '../action/action';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expireTime');
    yield localStorage.removeItem('userId');
    yield put({
        type: actions.LOG_OUT
    });
};

export function* chechAuthTimeSaga(action) {
    yield delay(action.time * 1000);
    yield put({
        type: actions.SAGA_LOGOUT
    });
};

export function* authSaga(action) {
    yield put(authStart());
    const data = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpMZZ9qaUg4L8ArBbMCQpJf9mJHwe-wCw';
    if(!action.method) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpMZZ9qaUg4L8ArBbMCQpJf9mJHwe-wCw';
    }
    
    try {
        const res = yield axios.post(url, data)
        const expireDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);

        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expireTime', expireDate);
        yield localStorage.setItem('userId', res.data.localId);
        
        yield put(authSuccess(res.data.idToken, res.data.localId));
        yield put(chechAuthTime(res.data.expiresIn));
    } catch(err) {
        yield put(authFailed(err.response.data.error));
    };     
};

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    if(!token) {
        yield put({
            type: actions.SAGA_LOGOUT
        });
    } else {
        const expireTime = yield new Date(localStorage.getItem('expireTime'));
        if(expireTime <= new Date()) {
            yield put({
                type: actions.SAGA_LOGOUT
            });
        } else {
            const userId = yield localStorage.getItem('userId')
            yield put(authSuccess(token, userId));
            const time = yield ((expireTime.getTime() - new Date().getTime()) / 1000);
            yield put(chechAuthTime(time));
        }
    };
};