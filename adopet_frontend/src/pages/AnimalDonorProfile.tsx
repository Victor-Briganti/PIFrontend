import * as React from "react";
import * as Router from "react-router-dom";
import * as MUI from "@mui/material";
import AxiosAnimal from "../api/AxiosAnimal";
import DescriptionDonorAnimal from "../components/DescriptionDonorAnimal";
import PageLayout from "../components/layouts/PageLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import UserContextNode from "../components/UserContextNode";

export default function AnimalDonorProfile() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [messageError, setMessageError] = React.useState<string>("");
  const params = Router.useParams();
  const [animal, setAnimal] = React.useState<InterfaceAnimal | undefined>(
    undefined
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
      <MUI.Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        paddingTop={"15%"}
      >
        <MUI.Typography variant={"h3"}>
          <b>Carregando.</b>
        </MUI.Typography>
      </MUI.Box>
    );
  }

  if (messageError !== "") {
    return (
      <MUI.Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        paddingTop={"15%"}
      >
        <MUI.Typography variant={"h3"}>
          <b>{messageError}</b>
        </MUI.Typography>
      </MUI.Box>
    );
  }

  return (
    <UserContextNode>
      <PageLayout color="primary.contrastText">
        {animal && <DescriptionDonorAnimal animal={animal} />}
      </PageLayout>
    </UserContextNode>
  );
}
