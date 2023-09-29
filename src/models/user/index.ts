interface User {
  id: string;
  data: UserData;
}

export interface UserData {
  idToken: string;
  username: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
}

export type UserOrNull = User | null;

export default User;
