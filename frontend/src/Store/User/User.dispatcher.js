import {
    updateInfo
} from 'Store/User';

import {
    updateToken
} from 'Store/Cookies';

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
}

export default new UserDispatcher();
