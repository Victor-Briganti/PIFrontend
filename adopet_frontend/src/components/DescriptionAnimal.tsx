import * as React from "react";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageLink } from "../models/interfaces/animal/InterfaceAnimalImage";
import AxiosAnimal from "../api/AxiosAnimal";
import Slider from "./elements/Slider";
import InfoAnimal from "./elements/InfoAnimal";

interface DescriptionAnimalProps {
  animal: InterfaceAnimal;
}

export default function DescriptionAnimal({ animal }: DescriptionAnimalProps) {
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
  }, [animal]);

  if (imageAnimals.length === 0) {
    return <h1>Animal não pode ser carregado.</h1>;
  }

  return (
    <React.Fragment>
      <Slider banners={imageAnimals} /> <InfoAnimal animal={animal} />
    </React.Fragment>
  );
}
