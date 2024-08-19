import * as Router from "react-router-dom";
import GlobalError from "../components/errors/GlobalError";
import NotFound from "../components/errors/NotFound";
import About from "../pages/About";
import Home from "../pages/Home";
import animalRoutes from "./AnimalRoutes";
import userRoutes from "./UserRoutes";

const mainRoutes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <GlobalError />,
  },
  ...userRoutes,
  ...animalRoutes,
];

const router = Router.createBrowserRouter(mainRoutes);

export default function MainRouter() {
  return <Router.RouterProvider router={router} />;
}
