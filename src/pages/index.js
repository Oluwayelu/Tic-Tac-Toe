import { lazy } from "react";

const PlayPage = lazy(() => import("./Play"));
const WelcomePage = lazy(() => import("./Welcome"));
const TestPage = lazy(() => import("./test"));

export { WelcomePage as Welcome };
export { PlayPage as Play };
export { TestPage as Test };
