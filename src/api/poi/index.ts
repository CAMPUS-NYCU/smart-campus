import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { FIRESTORE_COLLECTIONS } from "../../constants/firebase";
import { FirestorePoi } from "../../models/firebase/firestore";
import Poi from "../../models/poi";
import { firestore } from "../../utils/firebase";
import {
  toFirebasePoiByPoi,
  toPoiByFirebasePoi,
} from "../../utils/types/firebase/poi";

import apiSlice from "..";

const poiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPois: builder.query<Poi[], void>({
      queryFn: async () => {
        const pois = await getDocs(
          collection(firestore, FIRESTORE_COLLECTIONS.POI),
        )
          .then((snapshot) =>
            snapshot.docs.map((doc) => doc.data() as FirestorePoi),
          )
          .then((pois) => pois.map(toPoiByFirebasePoi));

        return { data: pois };
      },
      providesTags: ["Poi"],
    }),
    getPoi: builder.query<Poi, string>({
      queryFn: async (arg) => {
        const poi = await getDoc(doc(firestore, FIRESTORE_COLLECTIONS.POI, arg))
          .then((snapshot) => snapshot.data() as FirestorePoi)
          .then(toPoiByFirebasePoi);

        return { data: poi };
      },
      providesTags: ["Poi"],
    }),
    addPoi: builder.mutation<string, Poi>({
      queryFn: async (arg) => {
        await addDoc(
          collection(firestore, FIRESTORE_COLLECTIONS.POI),
          toFirebasePoiByPoi(arg),
        );

        return { data: "ok" };
      },
      invalidatesTags: ["Poi"],
    }),
    updatePoi: builder.mutation<string, { id: string; data: Poi }>({
      queryFn: async (arg) => {
        await setDoc(
          doc(firestore, FIRESTORE_COLLECTIONS.POI, arg.id),
          toFirebasePoiByPoi(arg.data),
        );

        return { data: "ok" };
      },
      invalidatesTags: ["Poi"],
    }),
    deletePoi: builder.mutation<string, string>({
      queryFn: async (arg) => {
        await deleteDoc(doc(firestore, FIRESTORE_COLLECTIONS.POI, arg));

        return { data: "ok" };
      },
      invalidatesTags: ["Poi"],
    }),
  }),
});

export const {
  useGetPoisQuery,
  useGetPoiQuery,
  useAddPoiMutation,
  useUpdatePoiMutation,
  useDeletePoiMutation,
} = poiApiSlice;

export default poiApiSlice;
