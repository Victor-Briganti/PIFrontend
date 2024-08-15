import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosAdoption from "../../api/AxiosAdoption";
import AxiosAnimal from "../../api/AxiosAnimal";
import UserContext from "../../hooks/UserContext";
import InterfaceAdoption from "../../models/interfaces/adoption/InterfaceAdoption";
import InterfaceAnimal from "../../models/interfaces/animal/InterfaceAnimal";
import Modal from "../elements/Modal";
import AgeChoiceMap from "../../models/map_choices/AgeChoiceMap";
import CoatChoiceMap from "../../models/map_choices/CoatChoiceMap";
import GenderChoiceMap from "../../models/map_choices/GenderChoiceMap";
import SizeChoiceMap from "../../models/map_choices/SizeChoiceMap";
import SpecieChoiceMap from "../../models/map_choices/SpecieChoiceMap";
import { ErrorMessage, SuccessMessage } from "./Message";
import InterfaceUserCommon from "../../models/interfaces/user/InterfaceUserCommon";

interface InfoAnimalProps {
  animal: InterfaceAnimal;
}

export default function InfoAnimal({ animal }: InfoAnimalProps) {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [activeAdoptionButton, setActiveAdoptionButton] =
    React.useState<boolean>(true);
  const [age, setAge] = React.useState<string>("");
  const [specie, setSpecie] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("");
  const [size, setSize] = React.useState<string>("");
  const [coat, setCoat] = React.useState<string>("");
  const [donor, setDonor] = React.useState<InterfaceUserCommon>();
  const user = React.useContext(UserContext);
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    const axiosAdoption = new AxiosAdoption();
    const axiosAnimal = new AxiosAnimal();
    const ageMap = new AgeChoiceMap();
    const specieMap = new SpecieChoiceMap();
    const genderMap = new GenderChoiceMap();
    const sizeMap = new SizeChoiceMap();
    const coatMap = new CoatChoiceMap();

    if (animal.id === undefined) return;

    axiosAdoption
      .getUserAdoptionDetail(animal.id)
      .then((response) => {
        if (
          user.context !== null &&
          response.adopter === user.context.id &&
          (response.request_status === "pending" ||
            response.request_status === "rejected")
        )
          setActiveAdoptionButton(false);
      })
      .catch((_error) => {});

    axiosAnimal
      .getUserDonor(animal.id)
      .then((response) => {
        if (response === undefined) {
          setErrorMessage("Não foi possível carregar o doador deste animal");
        } else {
          setDonor(response);
        }
      })
      .catch((error) => {
        setErrorMessage("Não foi possível carregar o doador deste animal");
      });

    if (animal.age !== undefined) {
      const ageValue = ageMap.getValueByKey(animal.age);
      if (ageValue !== undefined) setAge(ageValue);
    }

    if (animal.specie !== undefined) {
      const specieValue = specieMap.getValueByKey(animal.specie);
      if (specieValue !== undefined) setSpecie(specieValue);
    }

    if (animal.gender !== undefined) {
      const genderValue = genderMap.getValueByKey(animal.gender);
      if (genderValue !== undefined) setGender(genderValue);
    }

    if (animal.size !== undefined) {
      const sizeValue = sizeMap.getValueByKey(animal.size);
      if (sizeValue !== undefined) setSize(sizeValue);
    }

    if (animal.coat !== undefined) {
      const coatValue = coatMap.getValueByKey(animal.coat);
      if (coatValue !== undefined) setCoat(coatValue);
    }
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
        navigate(-1);
      });
    }

    setOpenModal(false);
  }, [navigate, animal]);

  const handleCloseModal = React.useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <MUI.Box width={"100%"}>
      <MUI.Typography variant="h4">{animal.name}</MUI.Typography>
      {/* CONTAINER INFORMAÇÕES*/}
      <MUI.Grid container>
        <MUI.Grid container item spacing={2} paddingY={2}>
          {/* INFORMAÇÕES DOADOR */}
          {donor !== undefined && (
            <MUI.Grid item xs={12} md={6}>
              <MUI.Card>
                <MUI.Box padding={2}>
                  <MUI.Typography variant="h5">Doador</MUI.Typography>
                  <MUI.Typography>
                    Nome: {donor.firstname} {donor.lastname}
                  </MUI.Typography>
                  <MUI.Typography>Email: {donor.email}</MUI.Typography>
                </MUI.Box>
              </MUI.Card>
            </MUI.Grid>
          )}
          {/* DESCRIÇÃO */}
          {animal.description !== undefined && animal.description.length > 0 ? (
            <React.Fragment>
              <MUI.Grid item xs={12} md={6}>
                <MUI.Card>
                  <MUI.Box padding={2}>
                    <MUI.Typography variant="h5">Descrição</MUI.Typography>
                    <MUI.Typography sx={{ overflowWrap: "break-word" }}>
                      {animal.description}
                    </MUI.Typography>
                  </MUI.Box>
                </MUI.Card>
              </MUI.Grid>
              <MUI.Grid container item spacing={2} paddingY={2}>
                <MUI.Grid item xs={12} md={12}>
                  <MUI.Card>
                    <MUI.Box padding={2}>
                      <MUI.Typography variant="h5">
                        Características
                      </MUI.Typography>
                      <MUI.Typography>Idade: {age}</MUI.Typography>
                      <MUI.Typography>Espécie: {specie}</MUI.Typography>
                      <MUI.Typography>Genêro: {gender}</MUI.Typography>
                      <MUI.Typography>Tamanho: {size}</MUI.Typography>
                      <MUI.Typography>Pelagem: {coat}</MUI.Typography>
                      <MUI.Typography>
                        Peso: {animal.weight?.toString()} Kg
                      </MUI.Typography>
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
                  </MUI.Card>
                </MUI.Grid>
              </MUI.Grid>
            </React.Fragment>
          ) : (
            // <MUI.Grid container item spacing={2} paddingY={2}>
            <MUI.Grid item xs={12} md={6}>
              <MUI.Card>
                <MUI.Box padding={2}>
                  <MUI.Typography variant="h5">Características</MUI.Typography>
                  <MUI.Typography>Idade: {age}</MUI.Typography>
                  <MUI.Typography>Espécie: {specie}</MUI.Typography>
                  <MUI.Typography>Genêro: {gender}</MUI.Typography>
                  <MUI.Typography>Tamanho: {size}</MUI.Typography>
                  <MUI.Typography>Pelagem: {coat}</MUI.Typography>
                  <MUI.Typography>
                    Peso: {animal.weight?.toString()} Kg
                  </MUI.Typography>
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
              </MUI.Card>
            </MUI.Grid>
            // </MUI.Grid>
          )}
        </MUI.Grid>
        {/* FIM container informações */}
      </MUI.Grid>
      {/*BOTÕES ADOÇÃO */}
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
      {/*MODAIS ADOçÃO */}
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
    </MUI.Box>
  );
}
