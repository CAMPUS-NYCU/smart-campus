import { collection, getDocs, query, where } from "firebase/firestore";

import { firestoreConfig } from "../../constants/firebase";
import { FirestoreResource } from "../../models/firebase/firestore";
import { Resources } from "../../models/resource";
import { ResourceGroups } from "../../models/resourceGroup";
import { firestore } from "../../utils/firebase";
import { toResourceByFirebaseResource } from "../../utils/types/firebase/resource";

import apiSlice from "..";

const resourceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query<Resources, string | null>({
      queryFn: async (arg) => {
        const resources = await getDocs(
          query(
            collection(firestore, firestoreConfig.collection.resource),
            where("groupId", "==", arg),
          ),
        )
          .then((snapshot) =>
            snapshot.docs.map(
              (doc) => ({ id: doc.id, data: doc.data() }) as FirestoreResource,
            ),
          )
          .then((clusters) => clusters.map(toResourceByFirebaseResource))
          .then((clusters) =>
            Object.fromEntries(
              clusters.map((cluster) => [cluster.id, cluster.data]),
            ),
          );

        return { data: resources };
      },
      providesTags: ["Resource"],
    }),
    getResourceGroups: builder.query<ResourceGroups, void>({
      queryFn: async () => {
        const resourceGroups = await getDocs(
          collection(firestore, firestoreConfig.collection.resourceGroup),
        )
          .then((snapshot) =>
            snapshot.docs.map(
              (doc) => ({ id: doc.id, data: doc.data() }) as FirestoreResource,
            ),
          )
          .then((clusters) => clusters.map(toResourceByFirebaseResource))
          .then((clusters) =>
            Object.fromEntries(
              clusters.map((cluster) => [cluster.id, cluster.data]),
            ),
          );

        return { data: resourceGroups };
      },
      providesTags: ["ResourceGroup"],
    }),
  }),
});

export const { useGetResourceGroupsQuery, useGetResourcesQuery } =
  resourceApiSlice;

export default resourceApiSlice;
