import { put } from 'redux-saga/effects';
import axios from 'axios';
import { initIngredients, failed } from '../action/burgerBuilder';

export function* fetchIngredientsSaga(action) {
    if (!action.isAuth || !action.build) {
        try {
            const res = yield axios.get('https://burger-builder-9d1db.firebaseio.com/ingredients.json');      
            yield put(initIngredients(res.data));
        }  catch(err) {
            yield put(failed())
        }  
    };
};
