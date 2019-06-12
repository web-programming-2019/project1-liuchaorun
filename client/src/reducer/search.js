import actionType from '../action/actionType';

const initState = {};

const search = (state = initState, action) => {
    switch (action.type) {
        case actionType.DATA_CHANGE:
            return {
                ...state,
                [action.operate.key]: action.operate.value
            };
        case actionType.TABLE_UPDATE:
            return {
                ...state,
                table: action.table,
            };
        default: {
            return state;
        }
    }
};

export default search;
