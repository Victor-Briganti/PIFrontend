import * as Router from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Donation from "../pages/Donation";
import NotFound from "../pages/NotFound";
import userRoutes from "./UserRoutes";
import animalRoutes from "./AnimalRoutes";

const mainRoutes = [
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
  ...userRoutes,
  ...animalRoutes,
];

const router = Router.createBrowserRouter(mainRoutes);

export default function MainRouter() {
  return <Router.RouterProvider router={router} />;
}
