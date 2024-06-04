import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosAnimal from "../../api/AxiosAnimal";
import UserContext from "../../hooks/UserContext";
import InterfaceAnimal from "../../models/interfaces/animal/InterfaceAnimal";
import Modal from "../elements/Modal";

interface InfoAnimalProps {
  animal: InterfaceAnimal;
}

export default function InfoAnimal({ animal }: InfoAnimalProps) {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const user = React.useContext(UserContext);
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    if (user.context !== null) console.log(`User: ${user.context.id}`);

    console.log(`Animal: ${animal.donor}`);
  }, [user, animal]);

  const handleExclusion = React.useCallback(() => {
    setOpenModal(true);
  }, []);

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
          {user.context !== null && user.context.id === animal.donor ? (
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
            <MUI.Button
              color="primary"
              variant="contained"
              onClick={() => {
                console.log("Adotar");
              }}
            >
              Adotar
            </MUI.Button>
          )}
        </MUI.Grid>
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
