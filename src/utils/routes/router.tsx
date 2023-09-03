import { createBrowserRouter } from "react-router-dom";

import * as pages from "../../pages";
import url from "../../constants/routes";
import PrivateRoute from "../../components/routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: url.map,
    element: <pages.Map />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: url.settings,
        element: <pages.Settings />,
      },
    ],
  },
]);

export default router;
