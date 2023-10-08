import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { FIRESTORE_COLLECTIONS } from "../../constants/firebase";
import { FirestorePoi } from "../../models/firebase/firestore";
import Poi, { PoiData, Pois } from "../../models/poi";
import { firestore } from "../../utils/firebase";
import {
  toFirebasePoiDataByPoiData,
  toPoiByFirebasePoi,
} from "../../utils/types/firebase/poi";

import apiSlice from "..";

const poiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPois: builder.query<Pois, string | null>({
      queryFn: async (arg) => {
        if (!arg) {
          return { data: {} };
        }

        const pois = await getDocs(
          query(
            collection(firestore, FIRESTORE_COLLECTIONS.POI),
            where("clusterId", "==", arg),
          ),
        )
          .then((snapshot) =>
            snapshot.docs.map(
              (doc) => ({ id: doc.id, data: doc.data() }) as FirestorePoi,
            ),
          )
          .then((pois) => pois.map(toPoiByFirebasePoi))
          .then((pois) =>
            Object.fromEntries(pois.map((poi) => [poi.id, poi.data])),
          );

        return { data: pois };
      },
      providesTags: ["Poi"],
    }),
    getPoi: builder.query<Poi | null, string | null>({
      queryFn: async (arg) => {
        if (!arg) {
          return { data: null };
        }

        const poi = await getDoc(doc(firestore, FIRESTORE_COLLECTIONS.POI, arg))
          .then(
            (snapshot) =>
              ({ id: snapshot.id, data: snapshot.data() }) as FirestorePoi,
          )
          .then(toPoiByFirebasePoi);

        return { data: poi };
      },
      providesTags: ["Poi"],
    }),
    addPoi: builder.mutation<string, PoiData>({
      queryFn: async (arg) => {
        const docRef = await addDoc(
          collection(firestore, FIRESTORE_COLLECTIONS.POI),
          toFirebasePoiDataByPoiData(arg),
        );

        return { data: docRef.id };
      },
      invalidatesTags: ["Poi"],
    }),
    updatePoi: builder.mutation<string, Poi>({
      queryFn: async (arg) => {
        await setDoc(
          doc(firestore, FIRESTORE_COLLECTIONS.POI, arg.id),
          toFirebasePoiDataByPoiData(arg.data),
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
