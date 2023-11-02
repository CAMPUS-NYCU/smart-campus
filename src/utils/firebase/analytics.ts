import { getAnalytics } from "firebase/analytics";
import { firebaseApp } from ".";

const firebaseAnalytics = getAnalytics(firebaseApp);

export default firebaseAnalytics;
