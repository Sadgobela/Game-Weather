// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';

// IMPORT REDUCERS

import countriesReducer from './countriesReducer';
import answersReducer from './answersReducer';
// EXPORT APP REDUCER

const RootReducer = combineReducers({
    country: countriesReducer,
    answer: answersReducer,
});

export default RootReducer;
