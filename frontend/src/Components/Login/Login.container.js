import { connect } from 'react-redux';
import { UserDispatcher } from 'Store/User';
import Login from './Login.component';

const mapStateToProps = (state) => ({
    user: state.UserReducer.user,
    token: state.CookiesReducer.token
});

const mapDispatchToProps = (dispatch) => ({
    updateUserInfo: (options) => UserDispatcher.updateUserInfo(dispatch, options)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
