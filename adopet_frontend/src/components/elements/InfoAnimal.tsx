import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosAnimal from "../../api/AxiosAnimal";
import UserContext from "../../hooks/UserContext";
import InterfaceAnimal from "../../models/interfaces/animal/InterfaceAnimal";
import Modal from "../elements/Modal";
import AxiosAdoption from "../../api/AxiosAdoption";
import InterfaceAdoption from "../../models/interfaces/adoption/InterfaceAdoption";
import { SuccessMessage, ErrorMessage } from "./Message";

interface InfoAnimalProps {
  animal: InterfaceAnimal;
}

export default function InfoAnimal({ animal }: InfoAnimalProps) {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [activeAdoptionButton, setActiveAdoptionButton] =
    React.useState<boolean>(true);
  const user = React.useContext(UserContext);
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    const axiosAdoption = new AxiosAdoption();

    if (
      user.context === null ||
      animal.id === undefined ||
      user.context.id === undefined
    )
      return;

    axiosAdoption.getAdoptionDetailByAnimalId(animal.id).then((response) => {
      if (
        user.context !== null &&
        response.adopter === user.context.id &&
        response.request_status === "pending"
      )
        setActiveAdoptionButton(false);
    });
  }, [user, animal]);

  const handleExclusion = React.useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleAdoption = React.useCallback(() => {
    const axiosAdoption = new AxiosAdoption();

    if (user.context === null) {
      navigate("/user/register");
    }

    if (user.context !== null && user.context.id === undefined) {
      setErrorMessage("Usuário não encontrado");
      return;
    }

    if (animal.donor === undefined) {
      setErrorMessage("Doador não encontrado");
      return;
    }

    if (animal.id === undefined) {
      setErrorMessage("Animal não encontrado");
      return;
    }

    const adoption = {
      donor: animal.donor,
      adopter: user.context?.id,
      animal: animal.id,
      request_date: new Date(),
      request_status: "pending",
    } as InterfaceAdoption;

    axiosAdoption
      .registerAdoption(adoption)
      .then((response) => {
        setSuccessMessage("Requisição enviada");
      })
      .catch((error) => {
        setErrorMessage("Não foi possível adotar este animal");
      });
    setActiveAdoptionButton(false);
  }, [user, animal, navigate]);

  const handleConfirmModal = React.useCallback(() => {
    const axiosAnimal = new AxiosAnimal();

    if (animal.id !== undefined) {
      axiosAnimal.deleteAnimal(animal.id).then((response) => {
        navigate("/animals/donor");
      });
    }

    setOpenModal(false);
  }, [navigate, animal]);

  const handleCloseModal = React.useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <MUI.Box>
      <MUI.Typography variant="h4">{animal.name}</MUI.Typography>
      <MUI.Grid container justifyContent={"flex-start"}>
        <MUI.Grid item xs={6}>
          <MUI.Typography variant="h5">Características</MUI.Typography>

          <MUI.Box component={"ul"} textAlign={"start"} sx={{ pl: 16 }}>
            <MUI.Typography>Idade: {animal.age}</MUI.Typography>

            <MUI.Typography>Espécie: {animal.specie}</MUI.Typography>

            <MUI.Typography>Genêro: {animal.gender}</MUI.Typography>

            <MUI.Typography>Tamanho: {animal.size}</MUI.Typography>

            <MUI.Typography>Pelagem: {animal.coat}</MUI.Typography>

            <MUI.Typography>Peso: {animal.weight?.toString()}</MUI.Typography>

            <MUI.Typography>
              Treinado: {animal.is_house_trained ? "Sim" : "Não"}
            </MUI.Typography>

            <MUI.Typography>
              Precisa de cuidados Especiais:{" "}
              {animal.is_special_needs ? "Sim" : "Não"}
            </MUI.Typography>

            <MUI.Typography>
              Castrado: {animal.is_castrated ? "Sim" : "Não"}
            </MUI.Typography>

            <MUI.Typography>
              Vacinado: {animal.is_vaccinated ? "Sim" : "Não"}
            </MUI.Typography>
          </MUI.Box>
        </MUI.Grid>
        <MUI.Grid item xs={6}>
          <MUI.Typography variant="h5">Sobre</MUI.Typography>
          {animal.description && animal.description.length > 60 ? (
            <MUI.Box textAlign={"center"} sx={{ px: 4 }}>
              <MUI.Typography>{animal.description}</MUI.Typography>
            </MUI.Box>
          ) : (
            <MUI.Box textAlign={"center"}>
              <MUI.Typography>{animal.description}</MUI.Typography>
            </MUI.Box>
          )}
        </MUI.Grid>
        <MUI.Grid item xs={6}>
          {user.context !== null &&
          user.context.id === animal.donor &&
          animal.is_adopted === false ? (
            <React.Fragment>
              <MUI.Button
                variant="contained"
                color="error"
                onClick={handleExclusion}
              >
                Excluir
              </MUI.Button>
            </React.Fragment>
          ) : (
            activeAdoptionButton &&
            animal.is_adopted === false && (
              <MUI.Button
                color="primary"
                variant="contained"
                onClick={handleAdoption}
              >
                Adotar
              </MUI.Button>
            )
          )}
        </MUI.Grid>
        {successMessage && !errorMessage && (
          <SuccessMessage message={successMessage} />
        )}
        {errorMessage && !successMessage && (
          <ErrorMessage message={errorMessage} />
        )}
        <Modal
          title={`Deseja excluir ${animal.name}?`}
          dialog="Essa ação não pode ser desfeita."
          openModal={openModal}
          handleConfirmModal={handleConfirmModal}
          handleCloseModal={handleCloseModal}
        />
      </MUI.Grid>
    </MUI.Box>
  );
}
