import actionType from '../action/actionType';

const initState = {};

const book = (state = initState, action) => {
    switch (action.type) {
        case actionType.HANDLE_VALUE:
            return {
                ...state,
                value: action.value
            };
        case actionType.HANDLE_SUBMIT:
            return {
                ...state,
                submitting: !state.submitting,
            };
        case actionType.GET_DATA:
            return {
                ...state,
                comments: action.data.comments,
                bookDetails: action.data.bookDetails,
            };
        default:
            return state;
    }
};

export default book;
