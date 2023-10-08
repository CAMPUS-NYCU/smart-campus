interface User {
  id: string;
  auth: UserAuth;
  data: UserData;
}

export interface UserAuth {
  displayName: string;
  email: string | null;
  idToken: string;
  photoURL: string | null;
}

export interface UserData {}

export type UserOrNull = User | null;

export default User;
