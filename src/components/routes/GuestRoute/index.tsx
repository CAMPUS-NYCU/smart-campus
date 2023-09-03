import connector from "./connector";
import { default as GuestRouteComponent } from "./GuestRoute";

const GuestRoute = connector(GuestRouteComponent);

export default GuestRoute;
