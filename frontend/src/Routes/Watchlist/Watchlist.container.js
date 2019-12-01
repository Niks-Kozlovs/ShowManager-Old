import { connect } from 'react-redux';
import Watchlist from './Watchlist.component';

const mapStateToProps = (state) => ({
    user: state.UserReducer.user
});


export default connect(mapStateToProps)(Watchlist);
