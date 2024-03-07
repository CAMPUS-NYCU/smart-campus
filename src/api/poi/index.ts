import {
  Timestamp,
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

import { firestoreConfig } from "../../constants/firebase";
import {
  FirestorePoi,
  FirestorePoiData,
} from "../../models/firebase/firestore";
import Poi, { PoiData, Pois } from "../../models/poi";
import { firestore } from "../../utils/firebase";
import {
  toFirebasePoiDataByPoiData,
  toPoiDataByFirebasePoiData,
} from "../../utils/types/firebase/poi";

import apiSlice from "..";
import { generateImageStorageRef } from "../../utils/firebase/storage";
import { uploadBytes } from "firebase/storage";

const poiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPois: builder.query<Pois, void>({
      queryFn: async () => {
        const pois = await getDocs(
          collection(firestore, firestoreConfig.collection.poi),
        )
          .then((snapshot) =>
            snapshot.docs.map(
              (doc) => ({ id: doc.id, data: doc.data() }) as FirestorePoi,
            ),
          )
          .then((pois) =>
            Object.fromEntries(
              pois.map((poi) => [poi.id, toPoiDataByFirebasePoiData(poi.data)]),
            ),
          );

        return { data: pois };
      },
      providesTags: ["Poi"],
    }),
    getPois: builder.query<Pois, string | null>({
      queryFn: async (arg) => {
        if (!arg) {
          return { data: {} };
        }

        const pois = await getDocs(
          query(
            collection(firestore, firestoreConfig.collection.poi),
            where("clusterId", "==", arg),
          ),
        )
          .then((snapshot) =>
            snapshot.docs.map(
              (doc) => ({ id: doc.id, data: doc.data() }) as FirestorePoi,
            ),
          )
          .then((pois) =>
            Object.fromEntries(
              pois.map((poi) => [poi.id, toPoiDataByFirebasePoiData(poi.data)]),
            ),
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

        const poiData = await getDoc(
          doc(firestore, firestoreConfig.collection.poi, arg),
        )
          .then((snapshot) => snapshot.data() as FirestorePoiData)
          .then(toPoiDataByFirebasePoiData);

        const poi: Poi = {
          id: arg,
          data: poiData,
        };

        return { data: poi };
      },
      providesTags: ["Poi"],
    }),
    addPoi: builder.mutation<string, { data: PoiData }>({
      queryFn: async (arg) => {
        const uploadPromises = arg.data.photoPaths.map((url) =>
          fetch(url)
            .then((res) => res.blob())
            .then(async (blob) => {
              const ref = generateImageStorageRef("poi");
              await uploadBytes(ref, blob);
              return ref.fullPath;
            }),
        );
        const photoPaths = await Promise.all(uploadPromises);

        const firebaseData = {
          ...toFirebasePoiDataByPoiData(arg.data),
          photoPaths,
          createdAt: Timestamp.now(),
        };

        const docRef = await addDoc(
          collection(firestore, firestoreConfig.collection.poi),
          firebaseData,
        );

        return { data: docRef.id };
      },
      invalidatesTags: ["Poi"],
    }),
    updatePoi: builder.mutation<string, Poi>({
      queryFn: async (arg) => {
        const firebaseData = {
          ...toFirebasePoiDataByPoiData(arg.data),
          updatedAt: Timestamp.now(),
        };

        await setDoc(
          doc(firestore, firestoreConfig.collection.poi, arg.id),
          firebaseData,
        );

        return { data: "ok" };
      },
      invalidatesTags: ["Poi"],
    }),
    deletePoi: builder.mutation<string, string>({
      queryFn: async (arg) => {
        await deleteDoc(doc(firestore, firestoreConfig.collection.poi, arg));

        return { data: "ok" };
      },
      invalidatesTags: ["Poi"],
    }),
  }),
});

export const {
  useGetAllPoisQuery,
  useGetPoisQuery,
  useGetPoiQuery,
  useAddPoiMutation,
  useUpdatePoiMutation,
  useDeletePoiMutation,
} = poiApiSlice;

export default poiApiSlice;
