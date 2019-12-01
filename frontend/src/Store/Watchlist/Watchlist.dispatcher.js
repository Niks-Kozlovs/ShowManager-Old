class UserDispatcher {
    addToWatchList(dispatch, options) {
        console.log('Added to watchlist: ', options);
    }
}

export default new UserDispatcher();
