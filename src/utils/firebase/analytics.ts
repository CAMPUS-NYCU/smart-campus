import { getAnalytics } from "firebase/analytics";

import { firebaseApp } from ".";

const analytics = getAnalytics(firebaseApp);

export default analytics;
