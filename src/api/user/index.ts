import {
  AuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { firestoreConfig } from "../../constants/firebase";
import User, { UserOrNull } from "../../models/user";
import { FirestoreUserData } from "../../models/firebase/firestore";
import { firebaseAuth, firestore } from "../../utils/firebase";
import { loadCurrentUser } from "../../utils/firebase/auth";

import apiSlice from "..";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserOrNull, void>({
      queryFn: async () => {
        const currentUser = await loadCurrentUser();

        if (!currentUser) {
          return { data: null };
        }

        const userDataFromFirestore = await getDoc(
          doc(firestore, firestoreConfig.collection.user, currentUser.uid),
        ).then((doc) => doc.data() as FirestoreUserData);

        const user: User = {
          id: currentUser.uid,
          auth: {
            displayName: currentUser.displayName || "",
            email: currentUser.email,
            idToken: await currentUser.getIdToken(),
            photoURL: currentUser.photoURL,
          },
          data: {
            ...userDataFromFirestore,
          },
        };

        return { data: user };
      },
      providesTags: ["User"],
    }),
    isLoggedIn: builder.query<boolean, void>({
      queryFn: async () => {
        const currentUser = await loadCurrentUser();

        return { data: !!currentUser };
      },
      providesTags: ["User"],
    }),
    loginWithEmailAndPassword: builder.mutation<
      string,
      { email: string; password: string }
    >({
      queryFn: async (arg) => {
        await signInWithEmailAndPassword(firebaseAuth, arg.email, arg.password);

        return { data: "ok" };
      },
      invalidatesTags: ["User"],
    }),
    registerWithEmailAndPassword: builder.mutation<
      string,
      { email: string; password: string }
    >({
      queryFn: async (arg) => {
        const userCredential = await createUserWithEmailAndPassword(
          firebaseAuth,
          arg.email,
          arg.password,
        );

        const userDataFromFirestore: FirestoreUserData = {};

        await setDoc(
          doc(
            firestore,
            firestoreConfig.collection.user,
            userCredential.user.uid,
          ),
          userDataFromFirestore,
        );

        return { data: "ok" };
      },
      invalidatesTags: ["User"],
    }),
    loginWithProvider: builder.mutation<string, AuthProvider>({
      queryFn: async (arg) => {
        const userCredential = await signInWithPopup(firebaseAuth, arg);

        const isNewUser = getAdditionalUserInfo(userCredential)?.isNewUser;
        if (isNewUser) {
          const userDataFromFirestore: FirestoreUserData = {};

          await setDoc(
            doc(
              firestore,
              firestoreConfig.collection.user,
              userCredential.user.uid,
            ),
            userDataFromFirestore,
          );
        }

        return { data: "ok" };
      },
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      queryFn: async () => {
        await signOut(firebaseAuth);

        return { data: "ok" };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useIsLoggedInQuery,
  useLoginWithEmailAndPasswordMutation,
  useRegisterWithEmailAndPasswordMutation,
  useLoginWithProviderMutation,
  useLogoutMutation,
} = userApiSlice;

export default userApiSlice;
