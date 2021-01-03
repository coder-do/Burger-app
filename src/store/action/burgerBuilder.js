import * as action from './action';

export const addIngredient = name => {
    return {
        type: action.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = name => {
    return {
        type: action.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const initIngredients = ingredient => {
    return {
        type: action.SET_INGREDIENT,
        ingredients: ingredient
    };
};

export const failed = () => {
    return {
        type: action.FAILED
    };
};

export const fetchIngredients = (isAuth, purchased, build) => {
    return {
        type: action.FETCH_INGREDIENTS_SAGA,
        isAuth: isAuth,
        purchased: purchased,
        build: build
    };
};

