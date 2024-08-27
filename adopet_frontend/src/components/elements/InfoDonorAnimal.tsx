import * as MUI from "@mui/material";
import * as React from "react";
import UserContext from "../../hooks/UserContext";
import InterfaceAnimal from "../../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAdoption } from "../../models/interfaces/adoption/InterfaceAdoption";
import AxiosDonor from "../../api/AxiosDonor";
import CardRequest from "./cards/CardRequest";

interface InfoDonorAnimalProps {
  animal: InterfaceAnimal;
}

export default function InfoDonorAnimal({ animal }: InfoDonorAnimalProps) {
  const [messageError, setMessageError] = React.useState<string>("");
  const [requests, setRequests] = React.useState<InterfaceAdoption[]>();
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    const axiosDonor = new AxiosDonor();

    if (
      user.context === null ||
      animal.id === undefined ||
      user.context.id === undefined
    )
      return;

    axiosDonor
      .getAdoptionDetailByAnimalId(animal.id)
      .then((response) => {
        setRequests(response);
      })
      .catch(() => {
        setMessageError("Erro ao carregar as requisições");
      });
  }, [user, animal]);

  if (requests === undefined) {
    return <h1>Animal não pode ser carregado</h1>;
  }

  return (
    <MUI.Box alignSelf={"center"}>
      <MUI.Typography paddingBottom={2} variant="h4">
        {animal.name}
      </MUI.Typography>
      {messageError !== "" ? (
        <MUI.Box>{messageError}</MUI.Box>
      ) : (
        <MUI.Grid container spacing={2}>
          {requests.map(
            (request) =>
              request.request_status === "pending" && (
                <MUI.Grid item>
                  <CardRequest key={request.id} adoption={request} />
                </MUI.Grid>
              )
          )}
        </MUI.Grid>
      )}
    </MUI.Box>
  );
}
