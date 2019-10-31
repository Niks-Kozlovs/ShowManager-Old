import Cookies from 'js-cookie';
import {
    updateInfo
} from 'Store/User';
import {
    updateToken,
    cookiesLogIn
} from 'Store/Cookies';

class CookiesDispatcher {
    updateUserToken(dispatch, token) {
        dispatch(updateToken(token));
    }

    checkCookiesLogIn(dispatch) {
        const JSONCookies = Cookies.get('tokens');

        if (!JSONCookies) {
            return;
        }

        const cookies = JSON.parse(JSONCookies);

        this._authenticate(cookies).then((user) => {
            dispatch(updateInfo(user));
        });

        // console.log(user);

        dispatch(cookiesLogIn(cookies));
    }

    async _authenticate(tokens) {
        const { access_token } = tokens;

        const url = 'http://localhost:8000/graphql';
        const query = JSON.stringify({
            query: `
            query {
                me {
                  name,
                  email
                }
              }
        `
        });

        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ access_token }` },
            body: query
        })
            .then((res) => res.json())
            .then((res) => res.data.me);
    }
}

export default new CookiesDispatcher();
