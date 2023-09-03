import connector from "./connector";
import { default as PrivateRouteComponent } from "./PrivateRoute";

const PrivateRoute = connector(PrivateRouteComponent);

export default PrivateRoute;
