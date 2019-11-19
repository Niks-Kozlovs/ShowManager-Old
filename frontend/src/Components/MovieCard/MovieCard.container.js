import { connect } from 'react-redux';
import { WatchlistDispatcher } from 'Store/Watchlist';
import MovieCard from './MovieCard.component';

const mapStateToProps = (state) => ({
    user: state.UserReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    addToWatchlist: (options) => WatchlistDispatcher.addToWatchList(dispatch, options)
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
