import * as Router from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Donation from "../pages/Donation";
import NotFound from "../pages/NotFound";

const router = Router.createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/donation",
    element: <Donation />,
  },
]);

export default function MainRouter() {
  return <Router.RouterProvider router={router} />;
}
