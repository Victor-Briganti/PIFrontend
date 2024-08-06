import * as React from "react";
import * as Router from "react-router-dom";
import * as MUI from "@mui/material";
import UpdateAnimal from "../components/UpdateAnimal";
import FormLayout from "../components/layouts/FormLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import UserContext from "../hooks/UserContext";

export default function AnimalUpdate() {
  const user = React.useContext(UserContext);
  const location = Router.useLocation();
  const animalLocation = location.state.animal;
  const [messageError, setMessageError] = React.useState<string>("");
  const [animal, setAnimal] = React.useState<InterfaceAnimal>();
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    if (!animalLocation) {
      throw new Error("Animal não encontrado");
    }
    setAnimal(animalLocation);
  }, [animalLocation]);

  const handleRegisterStep = React.useCallback(
    (_newAnimal: InterfaceAnimal) => {
      navigate(-1);
    },
    [navigate],
  );

  if (user.context === null) {
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

  return (
    <FormLayout>
      <UpdateAnimal
        messageError={messageError}
        setMessageError={setMessageError}
        animal={animal}
        handleRegisterStep={handleRegisterStep}
      />
    </FormLayout>
  );
}
