import * as React from "react";
import * as MUI from "@mui/material";
import Carousel from "react-material-ui-carousel";
import AxiosAnimal from "./api/AxiosAnimal";
import { ImageAnimal } from "./models/ImageAnimal";
import { Animal } from "./models/Animal";

const axiosAnimal = new AxiosAnimal();

export default function AnimalCarousel() {
  const [images, setImages] = React.useState<ImageAnimal[]>([]);
  const [animal, setAnimal] = React.useState<Animal | null>(null);

  React.useEffect(() => {
    axiosAnimal
      .listImagesById(7)
      .then((response) => {
        const imageAnimals = response.map((item) => new ImageAnimal(item));
        setImages(imageAnimals);
      })
      .catch((error) => {
        console.error(error);
      });

    axiosAnimal
      .getAnimalById(7)
      .then((response) => {
        setAnimal(new Animal(response));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!animal || !images) {
    return <div>Carregando...</div>;
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
                height: "500px",
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
          Precisa de cuidados Especiais: {animal.is_special_needs ? "Sim" : "Não"}
        </MUI.Typography>
      </MUI.Box>
    </MUI.Box>
  );
}
