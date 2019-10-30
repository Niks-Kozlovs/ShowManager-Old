import Cookies from 'js-cookie';

import {
    UPDATE_TOKEN,
    COOKIES_LOG_IN
} from './Cookies.action';

const updateUserToken = (action) => {
    const { token } = action;
    const { access_token, expires_in, refresh_token } = token;
    console.log('ACC: ', access_token);
    console.log('REF: ', refresh_token);
    Cookies.set('tokens', { access_token, refresh_token }, { expires: expires_in });
    console.log(JSON.parse(Cookies.get('tokens')));
    return action;
};

const initialState = {
    token: {
        access_token: null,
        expires_in: null,
        refresh_toke: null,
        token_type: null
    }
};

const CookiesReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case UPDATE_TOKEN:
        return {
            ...state,
            ...updateUserToken(action)
        };

    case COOKIES_LOG_IN:
        console.log('Cookies log in: ', action);
        return state;

    default:
        return state;
    }
};

export default CookiesReducer;
