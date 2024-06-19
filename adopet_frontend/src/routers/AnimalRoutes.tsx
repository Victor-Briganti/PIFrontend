import AnimalDonorList from "../pages/AnimalDonorList";
import AnimalList from "../pages/AnimalList";
import AnimalProfile from "../pages/AnimalProfile";
import AnimalRegister from "../pages/AnimalRegister";
import AnimalAdoptedList from "../pages/AnimalAdoptedList";
import AnimalDonorProfile from "../pages/AnimalDonorProfile";
import AnimalRequestList from "../pages/AnimalRequestList";
import GlobalError from "../components/errors/GlobalError";

const animalRoutes = [
  {
    path: "/animals",
    element: <AnimalList />,
  },
  {
    path: "/animals/donor",
    element: <AnimalDonorList />,
    errorElement: <GlobalError />,
  },
  {
    path: "/animals/adopted",
    element: <AnimalAdoptedList />,
    errorElement: <GlobalError />,
  },
  {
    path: "/animals/requests",
    element: <AnimalRequestList />,
    errorElement: <GlobalError />,
  },
  {
    path: "/animal/:animalId",
    element: <AnimalProfile />,
    errorElement: <GlobalError />,
  },
  {
    path: "/animal/donor/:animalId",
    element: <AnimalDonorProfile />,
    errorElement: <GlobalError />,
  },
  {
    path: "/animal/register",
    element: <AnimalRegister />,
    errorElement: <GlobalError />,
  },
];

export default animalRoutes;
