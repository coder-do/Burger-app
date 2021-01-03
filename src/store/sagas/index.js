import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { logoutSaga, chechAuthTimeSaga, authSaga, authCheckStateSaga } from './auth';
import { fetchIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import * as action from '../action/action';

export function* watchAuth() {
    yield all([
        takeEvery(action.CHECK_AUTH_TIMEOUT, chechAuthTimeSaga),
        takeEvery(action.SAGA_LOGOUT, logoutSaga),
        takeEvery(action.AUTH_USER_SAGA, authSaga),
        takeEvery(action.CHECK_AUTH_STATE, authCheckStateSaga)
    ]); 
};

export function* watchBurger() {
    yield takeEvery(action.FETCH_INGREDIENTS_SAGA, fetchIngredientsSaga);
};

export function* watchOrder() {
    yield all([
        takeLatest(action.PURCHASE_BURGER_SAGA, purchaseBurgerSaga),
        takeEvery(action.FETCH_ORDERS_SAGA, fetchOrdersSaga)
    ]);
};