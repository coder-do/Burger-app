import { put } from 'redux-saga/effects';
import { purchaseBurgerStart, fetchOrdersStart, 
    fetchOrdersSuccess, fetchOrdersFailed,
    purchaseBurgerSuccess, purchaseBurgerFailed } from '../action/order';
import axios from '../../axios';

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart());
    try {
        const res = yield axios.post('/orders.json?auth=' + action.token, action.data)
        yield put(purchaseBurgerSuccess(res.data.name, action.data));
    } catch(err) {
        yield put(purchaseBurgerFailed(err));
    }
};

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart());
    const params = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const res = yield axios.get('/orders.json' + params);
        const fetched = [];
        for(let key in res.data) {
            yield fetched.push({
                ...res.data[key],
                id: key
            });
        }
        yield put(fetchOrdersSuccess(fetched));
    } catch(err) {
        yield put(fetchOrdersFailed(err.message));
    };
};