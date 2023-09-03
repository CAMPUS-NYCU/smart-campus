interface UserState {
  id: string | null;
  username: string | null;
  token: string | null;
}

export interface UserAuthState
  extends Pick<UserState, "id" | "username" | "token"> {}

export const initialUserState: UserState = {
  id: null,
  username: null,
  token: null,
};

export default UserState;
