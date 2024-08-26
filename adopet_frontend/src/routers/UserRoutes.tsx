import GlobalError from "../components/errors/GlobalError";
import ChangePassword from "../pages/ChangePassword";
import Login from "../pages/Login";
import UserProfile from "../pages/UserProfile";
import UserRegister from "../pages/UserRegister";

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
