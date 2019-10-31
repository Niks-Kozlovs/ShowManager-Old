/* eslint-disable no-param-reassign */
import {
    UPDATE_USER_INFO
} from './User.action';

const updateInfo = (action, status = false) => {
    action.user.loggedIn = status;
    return action;
};

const initialState = {
    user: {
        name: '',
        email: '',
        loggedIn: false
    }
};

const UserReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case UPDATE_USER_INFO:
        const { user } = action;
        if (Object.keys(user).length === 0) {
            return {
                ...state
            };
        }

        return {
            ...state,
            ...updateInfo(action, true)
        };

    default:
        return state;
    }
};

export default UserReducer;
