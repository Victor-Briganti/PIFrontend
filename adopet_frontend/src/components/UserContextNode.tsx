import * as React from "react";
import * as Router from "react-router-dom";
import * as MUI from "@mui/material";
import UserContext from "../hooks/UserContext";
import AxiosUser from "../api/AxiosUser";
import InterfaceUserCommon from "../models/interfaces/user/InterfaceUserCommon";

interface UserContextNodeProps {
  children: React.ReactNode;
}

export default function UserContextNode({ children }: UserContextNodeProps) {
  const user = React.useContext(UserContext);
  const axiosUser = React.useMemo(() => new AxiosUser(), []);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      if (user.context === null) {
        await axiosUser.getUserCommon().then((data: InterfaceUserCommon) => {
          user.setContext(data);
        });
      }
      setLoading(false);
    };

    fetchUser();
  }, [user, axiosUser, setLoading]);

  if (loading === true) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (user.context === null && loading === false) {
    return (
      <React.Fragment>
        <h1>Faça login para acessar.</h1>
        <MUI.Box sx={{ mt: 2 }}>
          <MUI.Link
            component={Router.Link}
            to={"/"}
            variant="body2"
            fontSize={20}
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Voltar para home
          </MUI.Link>
        </MUI.Box>
      </React.Fragment>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}
