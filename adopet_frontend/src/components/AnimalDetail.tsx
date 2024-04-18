import * as React from "react";
import * as MUI from "@mui/material";
import Carousel from "react-material-ui-carousel";
import AxiosAnimal from "./api/AxiosAnimal";
import { ImageAnimal } from "./models/ImageAnimal";
import { Animal } from "./models/Animal";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const axiosAnimal = new AxiosAnimal();

export default function AnimalCarousel() {
  const [images, setImages] = React.useState<ImageAnimal[]>([]);
  const [animal, setAnimal] = React.useState<Animal | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    axiosAnimal
      .listImagesById(location.state.animalId)
      .then((response) => {
        const imageAnimals = response.map((item) => new ImageAnimal(item));
        setImages(imageAnimals);
      })
      .catch((error) => {
        console.error(error);
      });

    axiosAnimal
      .getAnimalById(location.state.animalId)
      .then((response) => {
        setAnimal(new Animal(response));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [location]);

  if (!animal || !images) {
    return <div>Carregando...</div>;
  } else if (!location) {
    return (
      <div>
        <h1>Não foi possível carregar informações sobre este animal.</h1>
      </div>
    );
  }

  const handleAnimalChange = (event) => {
    navigate("/changeanimal", { state: { animal: animal } });
  };

  // Função que é chamada quando o formulário é submetido
  const handleExclusion = (event) => {
    event.preventDefault();
    setOpenModal(true);
  };

  const handleExclusionConfirm = () => {
    axiosAnimal.deleteAnimal(animal.id).then(() => {
      navigate("/animals");
    });
  };

  // Função que é chamada quando o usuário fecha o modal de confirmação
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <MUI.Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      minHeight={"100vh"}
      height={"100%"}
      flexGrow={1}
      sx={{
        marginX: "auto",
        backgroundColor: "secondary.light",
      }}
    >
      <MUI.Card
        sx={{
          marginY: 2,
          paddingBottom: 2,
          maxWidth: "lg",
          width: "80%",
          borderRadius: "10px",
          boxShadow: 1,
        }}
      >
        <MUI.Box bgcolor={"black"}>
          <Carousel>
            {images.map((imageAnimal, i) => (
              <MUI.Paper
                key={i}
                elevation={0}
                sx={{ backgroundColor: "black" }}
              >
                <MUI.Box
                  component="img"
                  sx={{
                    height: "auto",
                    maxHeight: 400,
                    objectFit: "scale-down",
                    width: "auto",
                  }}
                  src={imageAnimal.image}
                  alt={`Slide ${i}`}
                />
              </MUI.Paper>
            ))}
          </Carousel>
        </MUI.Box>
        <MUI.Box
          display={"flex"}
          flexDirection={"column"}
          mt={3}
          alignItems={"center"}
        >
          <MUI.Typography variant="h4">{animal.name}</MUI.Typography>
          <MUI.Grid container justifyContent={"flex-start"}>
            <MUI.Grid item xs={6}>
              <MUI.Typography variant="h5">Características</MUI.Typography>

              <MUI.Box component={"ul"} textAlign={"start"} sx={{ pl: 16 }}>
                <MUI.Typography>Idade: {animal.age}</MUI.Typography>
                <MUI.Typography>Espécie: {animal.getSpecie()}</MUI.Typography>
                <MUI.Typography>Genêro: {animal.getGender()}</MUI.Typography>
                <MUI.Typography>Tamanho: {animal.getSize()}</MUI.Typography>
                <MUI.Typography>Pelagem: {animal.coat}</MUI.Typography>
                <MUI.Typography>
                  Peso: {animal.weight?.toString()}
                </MUI.Typography>
                <MUI.Typography>
                  Treinado: {animal.is_house_trained ? "Sim" : "Não"}
                </MUI.Typography>
                <MUI.Typography>
                  Precisa de cuidados Especiais:{" "}
                  {animal.is_special_needs ? "Sim" : "Não"}
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
            <MUI.Grid item xs={12}>
              <MUI.Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                paddingTop="20px"
              >
                <MUI.Button
                  variant="contained"
                  onClick={handleAnimalChange}
                  sx={{ mb: 2, minWidth: "300px" }}
                >
                  Alterar Informações
                </MUI.Button>
                <MUI.Button
                  // fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mb: 2, minWidth: "300px" }}
                  onClick={handleExclusion}
                >
                  Excluir
                </MUI.Button>
              </MUI.Box>
              <MUI.Dialog
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <MUI.DialogTitle id="alert-dialog-title">
                  Deseja excluir {animal.name}?
                </MUI.DialogTitle>
                <MUI.DialogContent>
                  <MUI.DialogContentText id="alert-dialog-description">
                    Essa ação não pode ser desfeita.
                  </MUI.DialogContentText>
                </MUI.DialogContent>
                <MUI.DialogActions>
                  <MUI.Button
                    onClick={handleExclusionConfirm}
                    color="primary"
                    autoFocus
                    style={{
                      marginRight: "10px",
                      backgroundColor: "red",
                      color: "white",
                    }}
                  >
                    Confirmar
                  </MUI.Button>
                  <MUI.Button onClick={handleCloseModal} color="primary">
                    Cancelar
                  </MUI.Button>
                </MUI.DialogActions>
              </MUI.Dialog>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Box>
      </MUI.Card>
    </MUI.Box>
  );
}
