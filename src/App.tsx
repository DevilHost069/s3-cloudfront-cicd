import "./App.scss";
import { RouterProvider } from "react-router-dom";

import router from "./routes/routed";
import { Suspense } from "react";
import Loader from "@components/shared/Loader";
import HotjarTracking from "@components/HotjarTracking";
import { updateGlobalColors } from "@utils/tenant_configuration";

function App() {
  updateGlobalColors();
  return (
    <>
      <HotjarTracking />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
