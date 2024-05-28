import UserRegister from "../pages/UserRegister";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import ChangePassword from "../pages/ChangePassword";

const userRoutes = [
  {
    path: "/user",
    element: <UserProfile />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/register",
    element: <UserRegister />,
  },
  {
    path: "/user/changepassword",
    element: <ChangePassword />,
  },
];

export default userRoutes;
