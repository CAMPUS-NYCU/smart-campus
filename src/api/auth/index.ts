import {
  AuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { firebaseAuth } from "../../utils/firebase";
import { toUserAuthState, toUserAuthStateOrNull } from "../../utils/auth";

import { UserAuthState, UserAuthStateOrNull } from "./model";

import apiSlice from "..";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAuth: builder.query<UserAuthStateOrNull, void>({
      queryFn: async () => {
        const user = firebaseAuth.currentUser;

        return { data: await toUserAuthStateOrNull(user) };
      },
    }),
    isLoggedIn: builder.query<boolean, void>({
      queryFn: async () => {
        const user = firebaseAuth.currentUser;
        return { data: !!user };
      },
    }),
    loginWithEmailAndPassword: builder.mutation<
      UserAuthState,
      { email: string; password: string }
    >({
      queryFn: async (arg) => {
        const userAuth = await signInWithEmailAndPassword(
          firebaseAuth,
          arg.email,
          arg.password,
        )
          .then((userCredential) => userCredential.user)
          .then(toUserAuthState)
          .catch((error) => {
            throw new Error(error.message);
          });

        return { data: userAuth };
      },
    }),
    registerWithEmailAndPassword: builder.mutation<
      UserAuthState,
      { email: string; password: string }
    >({
      queryFn: async (arg) => {
        const userAuth = await createUserWithEmailAndPassword(
          firebaseAuth,
          arg.email,
          arg.password,
        )
          .then((userCredential) => userCredential.user)
          .then(toUserAuthState)
          .catch((error) => {
            throw new Error(error.message);
          });

        return { data: userAuth };
      },
    }),
    loginWithProvider: builder.mutation<UserAuthState, AuthProvider>({
      queryFn: async (arg) => {
        const userAuth = await signInWithPopup(firebaseAuth, arg)
          .then((userCredential) => userCredential.user)
          .then(toUserAuthState)
          .catch((error) => {
            throw new Error(error.message);
          });

        return { data: userAuth };
      },
    }),
    logout: builder.mutation({
      queryFn: async () => {
        await signOut(firebaseAuth);

        return { data: "ok" };
      },
    }),
  }),
});

export const {
  useGetUserAuthQuery,
  useIsLoggedInQuery,
  useLoginWithEmailAndPasswordMutation,
  useRegisterWithEmailAndPasswordMutation,
  useLoginWithProviderMutation,
  useLogoutMutation,
} = authApiSlice;

export default authApiSlice;
