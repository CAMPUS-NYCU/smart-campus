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
import {
  FirestorePoi,
  FirestorePoiData,
} from "../../models/firebase/firestore";
import Poi, { PoiData, PoiMedia, Pois } from "../../models/poi";
import { firestore } from "../../utils/firebase";
import {
  toFirebasePoiDataByPoiData,
  toPoiDataByFirebasePoiData,
} from "../../utils/types/firebase/poi";

import apiSlice from "..";
import {
  generateImageStorageRef,
  getImageStorageDirectoryRef,
} from "../../utils/firebase/storage";
import { getDownloadURL, listAll, uploadBytes } from "firebase/storage";

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
          doc(firestore, FIRESTORE_COLLECTIONS.POI, arg),
        )
          .then((snapshot) => snapshot.data() as FirestorePoiData)
          .then(toPoiDataByFirebasePoiData);

        const refs = await listAll(getImageStorageDirectoryRef("poi", arg));
        const downloadPromises = refs.items.map((item) => getDownloadURL(item));
        const poiMedia = {
          photoUrls: await Promise.all(downloadPromises),
        };

        const poi: Poi = {
          id: arg,
          data: poiData,
          media: poiMedia,
        };

        return { data: poi };
      },
      providesTags: ["Poi"],
    }),
    addPoi: builder.mutation<string, { data: PoiData; media: PoiMedia }>({
      queryFn: async (arg) => {
        const docRef = await addDoc(
          collection(firestore, FIRESTORE_COLLECTIONS.POI),
          toFirebasePoiDataByPoiData(arg.data),
        );

        const uploadPromises = arg.media.photoUrls.map((url) =>
          fetch(url)
            .then((res) => res.blob())
            .then((blob) =>
              uploadBytes(generateImageStorageRef("poi", docRef.id), blob),
            ),
        );
        await Promise.all(uploadPromises);

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
