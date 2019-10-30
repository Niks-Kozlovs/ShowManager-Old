export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const COOKIES_LOG_IN = 'COOKIES_LOG_IN';

const updateToken = (token) => ({
    type: UPDATE_TOKEN,
    token
});

const cookiesLogIn = (data) => ({
    type: COOKIES_LOG_IN,
    data
});

export {
    updateToken,
    cookiesLogIn
};
