interface UserState {
  id: string | null;
  idToken: string;
  username: string | null;
  displayName: string | null;
}

export const initialUserState: UserState = {
  id: null,
  username: null,
  idToken: "",
  displayName: null,
};

export interface UserAuthState
  extends Pick<UserState, "id" | "idToken" | "username" | "displayName"> {}

export const initialUserAuthState: UserState = {
  id: initialUserState.id,
  username: initialUserState.username,
  idToken: initialUserState.idToken,
  displayName: initialUserState.displayName,
};

export default UserState;
