import actionType from '../action/actionType';

const initState = {};

const login = (state = initState, action) => {
    switch (action.type) {
        case actionType.LOGIN:
            return {
                ...state,
                loginState: true,
            };
        case actionType.CHANGE:
            return {
                ...state,
                [action.operate.key]: action.operate.value
            };
        case actionType.LOGIN_FAIL:
            return {
                ...state,
                loginState: false.value,
            };
        default:
            return state;
    }
};

export default login;
