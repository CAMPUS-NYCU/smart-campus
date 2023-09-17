import { ConnectedProps, connect } from "react-redux";

import { ApplicationState } from "../../../store";

const mapState = (state: ApplicationState) => ({
  idToken: state.user.idToken,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector;
