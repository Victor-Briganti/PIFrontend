import * as React from "react";
import * as MUI from "@mui/material";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageLink } from "../models/interfaces/animal/InterfaceAnimalImage";
import AxiosAnimal from "../api/AxiosAnimal";
import Slider from "./elements/Slider";
import InfoAnimal from "./elements/InfoAnimal";

interface DescriptionAnimalProps {
  animal: InterfaceAnimal;
}

export default function DescriptionAnimal({ animal }: DescriptionAnimalProps) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [imageAnimals, setImagesAnimal] = React.useState<string[]>([]);

  React.useEffect(() => {
    const axiosAnimal = new AxiosAnimal();

    if (animal.id !== undefined) {
      axiosAnimal
        .listImageById(animal.id)
        .then((response) => {
          const animalImageResponse = response.map(
            (item) => item as InterfaceAnimalImageLink
          );

          const validImageUrls: string[] = [];
          for (let i = 0; i < animalImageResponse.length; i++) {
            validImageUrls.push(animalImageResponse[i].image);
          }

          setImagesAnimal(validImageUrls);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setLoading(false);
  }, [animal]);

  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (imageAnimals.length === 0) {
    return <h1>Animal não pode ser carregado.</h1>;
  }

  return (
    <MUI.Grid container spacing={5}>
      <MUI.Grid item xs={12} sm={6} md={6}>
        <Slider banners={imageAnimals} />
      </MUI.Grid>
      <MUI.Grid item xs={12} sm={6} md={6}>
        <InfoAnimal animal={animal} />
      </MUI.Grid>
    </MUI.Grid>
  );
}
