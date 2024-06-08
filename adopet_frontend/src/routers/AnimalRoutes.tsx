import AnimalDonorList from "../pages/AnimalDonorList";
import AnimalList from "../pages/AnimalList";
import AnimalProfile from "../pages/AnimalProfile";
import AnimalRegister from "../pages/AnimalRegister";
import AnimalAdoptionList from "../pages/AnimalAdoptionList";
import AnimalDonorProfile from "../pages/AnimalDonorProfile";

const animalRoutes = [
  {
    path: "/animals",
    element: <AnimalList />,
  },
  {
    path: "/animals/donor",
    element: <AnimalDonorList />,
  },
  {
    path: "/animals/requests",
    element: <AnimalAdoptionList />,
  },
  {
    path: "/animal/:animalId",
    element: <AnimalProfile />,
  },
  {
    path: "/animal/donor/:animalId",
    element: <AnimalDonorProfile />,
  },
  {
    path: "/animal/register",
    element: <AnimalRegister />,
  },
];

export default animalRoutes;
