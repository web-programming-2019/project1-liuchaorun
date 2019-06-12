import actionType from '../action/actionType';

const initState = {};

const framework = (state = initState, action) => {
    switch (action.type) {
        case actionType.TOGGLE:
            return {
                ...state,
                collapsed: !state.collapsed
            };
        default:
            return state;
    }
};

export default framework;
