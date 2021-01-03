import * as actions from '../action/action';

const initialState = {
    ingredinents: null,
    total: 0,
    error: false,
    build: false
};

const INGREDINENTS_PRICES = {
    Salad: 0.5,
    Meat: 0.6,
    Bacon: 0.3,
    Cheese: 0.2
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredinents: {
                    ...state.ingredinents,
                    [action.ingredientName]: state.ingredinents[action.ingredientName] + 1
                },
                total: state.total + INGREDINENTS_PRICES[action.ingredientName],
                build: true
            };
        case actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredinents: {
                    ...state.ingredinents,
                    [action.ingredientName]: state.ingredinents[action.ingredientName] - 1
                },
                total: state.total - INGREDINENTS_PRICES[action.ingredientName],
                build: true
            };
        case actions.SET_INGREDIENT:
            return {
                ...state,
                ingredinents: action.ingredients,
                error: false,
                total: 0,
                build: false
            };
        case actions.FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

export default reducer;