import { ConnectedProps, connect } from "react-redux";

import { ApplicationState } from "../../store";
import User from "../../store/user";

const mapState = (state: ApplicationState) => ({
  username: state.user.username,
});

const mapDispatch = {
  loginWithEmailAndPassword: User.actions.loginWithEmailAndPassword,
  logout: User.actions.logout,
};

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector;
