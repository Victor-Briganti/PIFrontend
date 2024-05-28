import AnimalList from "../pages/AnimalList";
import AnimalRegister from "../pages/AnimalRegister";

const animalRoutes = [
  {
    path: "/animals",
    element: <AnimalList />,
  },
  {
    path: "/animal/register",
    element: <AnimalRegister />,
  },
];

export default animalRoutes;
