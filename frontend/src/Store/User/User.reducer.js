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
        if (!user || Object.keys(user).length === 0) {
            return {
                ...state
            };
        }

        const { logout } = user;
        if (logout) {
            return {
                ...state,
                ...initialState
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
