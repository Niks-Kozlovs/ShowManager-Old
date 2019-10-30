import {
    UPDATE_USER_INFO
} from './User.action';

const updateInfo = (action) => action;

const initialState = {
    user: {
        name: ''
    }
};

const UserReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case UPDATE_USER_INFO:
        const { user } = action;
        if (Object.keys(user).length === 0) {
            return {
                ...state,
                ...updateInfo(initialState)
            };
        }

        return {
            ...state,
            ...updateInfo(action)
        };

    default:
        return state;
    }
};

export default UserReducer;
