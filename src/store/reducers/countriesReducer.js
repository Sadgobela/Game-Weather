import {chunk} from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
    countriesList : [],
    tempType: 'C',
};

function countriesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.COUNTRY_LIST_LOAD_FULFILLED:
            const list = action.payload.list.map(item => ({
                id: item.id,
                name: item.name,
                countryName: item.sys.country,
                temp: item.main.temp,
            }));
            return {
                ...state,
                countriesList: chunk(list, 2)
            };
        case actionTypes.TEMP_TYPE_CHANGE_FULFILLED:
            return {
                ...state,
                tempType: action.payload,
            };
        default:
            return state;
    }
}

export default countriesReducer;