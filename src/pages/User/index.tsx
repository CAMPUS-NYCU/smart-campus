import connector from "./connector";
import { default as UserComponent } from "./User";

const User = connector(UserComponent);

export default User;
