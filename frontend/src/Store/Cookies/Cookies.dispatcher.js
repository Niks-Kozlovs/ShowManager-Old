import {
    updateToken,
    cookiesLogIn
} from 'Store/Cookies';

class CookiesDispatcher {
    updateUserToken(dispatch, token) {
        dispatch(updateToken(token));
    }

    checkCookiesLogIn(dispatch) {
        const { cookies } = document;

        if (!cookies) {
            return;
        }

        // eslint-disable-next-line no-sparse-arrays
        const value = (cookies.match(/^(?:.*;)?\s*Token\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
        if (!value) {
            return;
        }

        dispatch(cookiesLogIn(cookies));
    }
}

export default new CookiesDispatcher();
