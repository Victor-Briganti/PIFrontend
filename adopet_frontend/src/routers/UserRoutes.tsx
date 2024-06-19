import UserRegister from "../pages/UserRegister";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import ChangePassword from "../pages/ChangePassword";
import GlobalError from "../components/errors/GlobalError";

const userRoutes = [
  {
    path: "/user",
    element: <UserProfile />,
    errorElement: <GlobalError />,
  },
  {
    path: "/user/login",
    element: <Login />,
    errorElement: <GlobalError />,
  },
  {
    path: "/user/register",
    element: <UserRegister />,
    errorElement: <GlobalError />,
  },
  {
    path: "/user/changepassword",
    element: <ChangePassword />,
    errorElement: <GlobalError />,
  },
];

export default userRoutes;
