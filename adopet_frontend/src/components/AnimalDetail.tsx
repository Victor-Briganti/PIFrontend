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
    <MUI.Box sx={{ maxWidth: 800, flexGrow: 1, margin: "auto", mt: 5 }}>
      <Carousel>
        {images.map((imageAnimal, i) => (
          <MUI.Paper
            key={i}
            elevation={0}
            style={{ backgroundColor: "transparent" }}
          >
            <MUI.Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              src={imageAnimal.image}
              alt={`Slide ${i}`}
            />
          </MUI.Paper>
        ))}
      </Carousel>
      <MUI.Box>
        <MUI.Typography variant="h5">{animal.name}</MUI.Typography>
        <MUI.Typography>Idade: {animal.age}</MUI.Typography>
        <MUI.Typography>Espécie: {animal.getSpecie()}</MUI.Typography>
        <MUI.Typography>Genêro: {animal.getGender()}</MUI.Typography>
        <MUI.Typography>Tamanho: {animal.getSize()}</MUI.Typography>
        <MUI.Typography>Pelagem: {animal.coat}</MUI.Typography>
        <MUI.Typography>Peso: {animal.weight?.toString()}</MUI.Typography>
        <MUI.Typography>Descrição: {animal.description}</MUI.Typography>
        <MUI.Typography>
          Treinado: {animal.is_house_trained ? "Sim" : "Não"}
        </MUI.Typography>
        <MUI.Typography>
          Precisa de cuidados Especiais:{" "}
          {animal.is_special_needs ? "Sim" : "Não"}
        </MUI.Typography>
      </MUI.Box>
    </MUI.Box>
  );
}
