export interface UserAuthState {
  id: string;
  idToken: string;
  username: string | null;
  displayName: string | null;
}

export type UserAuthStateOrNull = UserAuthState | null;
