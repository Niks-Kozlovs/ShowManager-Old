import { connect } from 'react-redux';
import { WatchlistDispatcher } from 'Store/Watchlist';
import MovieCard from './MovieCard.component';

const mapDispatchToProps = (dispatch) => ({
    addToWatchlist: (options) => WatchlistDispatcher.addToWatchList(dispatch, options)
});

export default connect(mapDispatchToProps)(MovieCard);
