interface UserState {
  id: string | null
  username: string | null
  token: string | null
}

export const initialUserState: UserState = {
  id: null,
  username: null,
  token: null,
};

export default UserState;