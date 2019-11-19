import {
    updateInfo
} from 'Store/User';

import {
    updateToken
} from 'Store/Cookies';
import Cookies from 'js-cookie';

class UserDispatcher {
    updateUserInfo(dispatch, user) {
        const { login } = user || { login: {} };
        const {
            access_token,
            expires_in,
            refresh_token,
            token_type,
            user: userLogin
        } = login;

        dispatch(updateToken({
            access_token, expires_in, refresh_token, token_type
        }));
        dispatch(updateInfo(userLogin));
    }

    logout(dispatch) {
        Cookies.remove('tokens');
        dispatch(updateInfo({ logout: true }));
    }
}

export default new UserDispatcher();
