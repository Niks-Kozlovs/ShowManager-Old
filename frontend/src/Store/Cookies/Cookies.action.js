export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const COOKIES_LOG_IN = 'COOKIES_LOG_IN';

const updateToken = (token) => ({
    type: UPDATE_TOKEN,
    token
});

const cookiesLogIn = (token) => ({
    type: COOKIES_LOG_IN,
    token
});

export {
    updateToken,
    cookiesLogIn
};
