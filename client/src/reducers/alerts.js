const initialState = [];
const { SET_ALERT, REMOVE_ALERT } = require('../actions/types');

const alertsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
};

export default alertsReducer;