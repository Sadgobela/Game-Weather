import actionTypes from '../actions/actionTypes';

const initialState = {
    answers : []
};

function answersReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_ANSWER_FULFILLED:
            return {
                ...state,
                answers: [...state.answers, action.payload]
            };
        default:
            return state;
    }
}

export default answersReducer;