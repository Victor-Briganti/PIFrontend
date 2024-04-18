import * as React from "react";
import * as MUI from "@mui/material";
import Carousel from "react-material-ui-carousel";
import AxiosAnimal from "./api/AxiosAnimal";
import { ImageAnimal } from "./models/ImageAnimal";
import { Animal } from "./models/Animal";
import { useLocation } from "react-router-dom";

const axiosAnimal = new AxiosAnimal();

export default function AnimalCarousel() {
  const [images, setImages] = React.useState<ImageAnimal[]>([]);
  const [animal, setAnimal] = React.useState<Animal | null>(null);
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
          </MUI.Grid>
        </MUI.Box>
      </MUI.Card>
    </MUI.Box>
  );
}
