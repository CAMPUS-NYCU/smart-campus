import { User } from "firebase/auth";

import { UserAuthState, UserAuthStateOrNull } from "../../api/auth/model";

export const toUserAuthStateOrNull = async (
  user: User | null,
): Promise<UserAuthStateOrNull> => {
  if (!user) {
    return null;
  }

  return await toUserAuthState(user);
};

export const toUserAuthState = async (user: User): Promise<UserAuthState> => ({
  id: user.uid,
  idToken: await user.getIdToken(),
  username: user.email,
  displayName: user.displayName,
});
