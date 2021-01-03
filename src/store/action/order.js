import * as action from './action';

export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: action.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    };
};

export const purchaseBurgerFailed = error => {
    return {
        type: action.PURCHASE_BURGER_FAILED,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: action.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (data, token) => {
    return {
        type: action.PURCHASE_BURGER_SAGA,
        data: data,
        token: token
    };
};

export const purchaseInit = () => {
    return {
        type: action.PURCHASE_INIT
    };
};


export const fetchOrdersSuccess = orders => {
    return {
        type: action.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = error => {
    return {
        type: action.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: action.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return {
        type: action.FETCH_ORDERS_SAGA,
        token: token,
        userId: userId
    };
};