import * as React from "react";
import * as Router from "react-router-dom";
import * as MUI from "@mui/material";
import AxiosAnimal from "../api/AxiosAnimal";
import DescriptionDonorAnimal from "../components/DescriptionDonorAnimal";
import PageLayout from "../components/layouts/PageLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import UserContext from "../hooks/UserContext";

export default function AnimalDonorProfile() {
  const user = React.useContext(UserContext);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [messageError, setMessageError] = React.useState<string>("");
  const params = Router.useParams();
  const [animal, setAnimal] = React.useState<InterfaceAnimal | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const axiosAnimal = new AxiosAnimal();
    setMessageError("");
    setLoading(true);

    if (params.animalId === undefined) {
      setMessageError("Animal não definido");
      setLoading(false);
      return;
    }

    const id = parseInt(params.animalId);
    if (isNaN(id) || id < 0) {
      setMessageError("Id do animal precisa ser um número válido");
      setLoading(false);
      return;
    }

    axiosAnimal
      .getAnimalByID(id)
      .then((response: InterfaceAnimal) => {
        setAnimal(response);
      })
      .catch(() => {
        setMessageError("Animal não foi encontrado");
      });

    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (messageError !== "") {
    return (
      <div>
        <h1>{messageError}</h1>
      </div>
    );
  }

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
    <PageLayout bgcolor="secondary.light" color="primary.contrastText">
      {animal && <DescriptionDonorAnimal animal={animal} />}
    </PageLayout>
  );
}
