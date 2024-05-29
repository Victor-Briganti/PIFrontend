import AnimalList from "../pages/AnimalList";
import AnimalProfile from "../pages/AnimalProfile";
import AnimalRegister from "../pages/AnimalRegister";

const animalRoutes = [
  {
    path: "/animals",
    element: <AnimalList />,
  },
  {
    path: "/animal/:animalId",
    element: <AnimalProfile />,
  },
  {
    path: "/animal/register",
    element: <AnimalRegister />,
  },
];

export default animalRoutes;
