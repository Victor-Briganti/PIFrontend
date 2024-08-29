import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosAdoption from "../../api/AxiosAdoption";
import AxiosAnimal from "../../api/AxiosAnimal";
import UserContext from "../../hooks/UserContext";
import { InterfaceAdoption } from "../../models/interfaces/adoption/InterfaceAdoption";
import InterfaceAnimal from "../../models/interfaces/animal/InterfaceAnimal";
import Modal from "../elements/Modal";
import AgeChoiceMap from "../../models/map_choices/AgeChoiceMap";
import CoatChoiceMap from "../../models/map_choices/CoatChoiceMap";
import GenderChoiceMap from "../../models/map_choices/GenderChoiceMap";
import SizeChoiceMap from "../../models/map_choices/SizeChoiceMap";
import SpecieChoiceMap from "../../models/map_choices/SpecieChoiceMap";
import { ErrorMessage, SuccessMessage } from "./Message";
import InterfaceUserCommon from "../../models/interfaces/user/InterfaceUserCommon";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";
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
  const [description, setDescription] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");
  const user = React.useContext(UserContext);
  const navigate = Router.useNavigate();
  const theme = useTheme();

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
    if (animal.register_date !== undefined) {
      const date = new Date(animal.register_date);
      setDate(date.toLocaleDateString());
    }
    if (animal.description !== undefined) {
      setDescription(animal.description.replace(/\n/g, "<br />"));
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

  const handleEdit = React.useCallback(() => {
    const axiosAnimal = new AxiosAnimal();
    if (animal.id !== undefined) {
      axiosAnimal.updateAnimal(animal).then((response) => {
        navigate("/animal/update/" + animal.id, { state: { animal: response } });
      });
    }
  }, [animal, navigate]);
  

  return (
    <MUI.Box
      width={"100%"}
      height={"100%"}
      flexDirection={"column"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      {/* CONTAINER INFORMAÇÕES */}
      <MUI.Box display={"flex"} flexDirection={"column"}>
        <MUI.Box alignSelf={"start"}>
          <MUI.Typography
            variant="h4"
            fontFamily={"PatuaOne"}
            color={(theme) => theme.palette.primary.main}
          >
            <b>{animal.name}</b>
          </MUI.Typography>
        </MUI.Box>
        <MUI.Box alignSelf={"start"}>
          <MUI.Typography color={"gray"}>
            {specie} | {gender} | {age} | {size} | Pelo {coat.toLowerCase()}
          </MUI.Typography>
        </MUI.Box>
        <MUI.Box alignSelf={"start"} paddingTop={2}>
          <MUI.Typography>
            {donor !== undefined ? (
              <React.Fragment>
                <MUI.Icon fontSize="medium" sx={{ color: "#f3a718" }}>
                  <PersonIcon />
                </MUI.Icon>
                Publicado por {donor?.firstname} {donor?.lastname} dia {date}
              </React.Fragment>
            ) : (
              ""
            )}
          </MUI.Typography>
        </MUI.Box>
        {animal.description ? (
          <MUI.Box alignSelf={"start"} paddingTop={3}>
            <MUI.Typography
              variant="h5"
              fontFamily={"PatuaOne"}
              color={"#f3a718"}
              textAlign={"start"}
            >
              <b>Detalhes sobre {animal.name}</b>
            </MUI.Typography>
            <MUI.Typography
              paddingY={2}
              variant="body1"
              textAlign={"left"}
              color={"text.primary"}
              sx={{ whiteSpace: "pre-line" }}
            >
              {animal.description}
            </MUI.Typography>
          </MUI.Box>
        ) : (
          ""
        )}
        <MUI.Box alignSelf={"start"} paddingTop={3}>
          <MUI.Typography
            variant="h5"
            fontFamily={"PatuaOne"}
            color={"#f3a718"}
            textAlign={"start"}
          >
            <b>Mais detalhes sobre {animal.name}</b>
          </MUI.Typography>
          <MUI.Box display={"flex"}>
            {animal.is_house_trained ? (
              <MUI.Box
                boxShadow={2}
                borderRadius={2}
                display={"inline-block"}
                marginY={1}
                marginX={"4px"}
                alignSelf={"start"}
              >
                <MUI.Typography
                  variant="body1"
                  textAlign={"left"}
                  color={"text.primary"}
                  borderRadius={2}
                  bgcolor={`${theme.palette.secondary.light}90`}
                  paddingX={1}
                >
                  Treinado
                </MUI.Typography>
              </MUI.Box>
            ) : (
              ""
            )}
            {animal.is_vaccinated ? (
              <MUI.Box
                boxShadow={2}
                borderRadius={2}
                display={"inline-block"}
                marginY={1}
                marginX={"4px"}
                alignSelf={"start"}
              >
                <MUI.Typography
                  variant="body1"
                  textAlign={"left"}
                  color={"text.primary"}
                  borderRadius={2}
                  bgcolor={`${theme.palette.secondary.light}90`}
                  paddingX={1}
                >
                  Vacinado
                </MUI.Typography>
              </MUI.Box>
            ) : (
              ""
            )}
            {animal.is_castrated ? (
              <MUI.Box
                boxShadow={2}
                borderRadius={2}
                display={"inline-block"}
                marginY={1}
                marginX={"4px"}
                alignSelf={"start"}
              >
                <MUI.Typography
                  variant="body1"
                  textAlign={"left"}
                  color={"text.primary"}
                  borderRadius={2}
                  bgcolor={`${theme.palette.secondary.light}90`}
                  paddingX={1}
                >
                  Castrado
                </MUI.Typography>
              </MUI.Box>
            ) : (
              ""
            )}
            {animal.is_special_needs ? (
              <MUI.Box
                boxShadow={2}
                borderRadius={2}
                display={"inline-block"}
                marginY={1}
                marginX={"4px"}
                alignSelf={"start"}
              >
                <MUI.Typography
                  variant="body1"
                  textAlign={"left"}
                  color={"text.primary"}
                  borderRadius={2}
                  bgcolor={`${theme.palette.secondary.light}90`}
                  paddingX={1}
                >
                  Possui necessidades especiais
                </MUI.Typography>
              </MUI.Box>
            ) : (
              ""
            )}
          </MUI.Box>
        </MUI.Box>
      </MUI.Box>
      {/*FIM container informações */}
      {/*BOTÕES ADOÇÃO */}
      {user.context !== null &&
      user.context.id === animal.donor &&
      animal.is_adopted === false ? (
        <MUI.Box width={"100%"}>
          <MUI.Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEdit}
            style={{ marginBottom: "10px" }} // Add some spacing between buttons
          >
          Editar
          </MUI.Button>
          <MUI.Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleExclusion}
          >
            Excluir
          </MUI.Button>
  
        </MUI.Box>
      ) : (
        activeAdoptionButton &&
        animal.is_adopted === false && (
          <MUI.Box>
            <MUI.Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleAdoption}
            >
              Adotar
            </MUI.Button>
          </MUI.Box>
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
