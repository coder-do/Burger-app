import * as actions from '../action/action';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PURCHASE_BURGER_SUCCESS:
            const newObj = {
                ...action.orderData,
                id: action.orderId,
                purchased: false
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newObj)
            };
        case actions.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false,

            };
        case actions.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            };
        case actions.PURCHASE_INIT:
            return {
                ...state,

            };
        case actions.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actions.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                loading: false,
                orders: action.orders,
                error: ''
            };
        case actions.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;