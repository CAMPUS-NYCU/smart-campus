import { ConnectedProps, connect } from "react-redux";

import { ApplicationState } from "../../../store";

const mapState = (state: ApplicationState) => ({
  token: state.user.token,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector;
