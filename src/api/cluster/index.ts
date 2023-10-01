import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { FIRESTORE_COLLECTIONS } from "../../constants/firebase";
import { FirestoreCluster } from "../../models/firebase/firestore";
import Cluster, { Clusters } from "../../models/cluster";
import { firestore } from "../../utils/firebase";
import { toClusterByFirebaseCluster } from "../../utils/types/firebase/cluster";

import apiSlice from "..";

const clusterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClusters: builder.query<Clusters, void>({
      queryFn: async () => {
        const clusters = await getDocs(
          collection(firestore, FIRESTORE_COLLECTIONS.CLUSTER),
        )
          .then((snapshot) =>
            snapshot.docs.map(
              (doc) => ({ id: doc.id, data: doc.data() }) as FirestoreCluster,
            ),
          )
          .then((clusters) => clusters.map(toClusterByFirebaseCluster))
          .then((clusters) =>
            Object.fromEntries(
              clusters.map((cluster) => [cluster.id, cluster.data]),
            ),
          );

        return { data: clusters };
      },
      providesTags: ["Cluster"],
    }),
    getCluster: builder.query<Cluster | null, string | null>({
      queryFn: async (arg) => {
        if (!arg) {
          return { data: null };
        }

        const cluster = await getDoc(
          doc(firestore, FIRESTORE_COLLECTIONS.CLUSTER, arg),
        )
          .then(
            (snapshot) =>
              ({ id: snapshot.id, data: snapshot.data() }) as FirestoreCluster,
          )
          .then(toClusterByFirebaseCluster);

        return { data: cluster };
      },
      providesTags: ["Cluster"],
    }),
  }),
});

export const { useGetClustersQuery, useGetClusterQuery } = clusterApiSlice;

export default clusterApiSlice;
