import * as React from "react";
import InterfaceAnimal from "../models/Animal";
import InterfaceAnimalImage from "../models/AnimalImage";
import AxiosAnimal from "../api/AxiosAnimal";
import Slider from "./Slider";
import InfoAnimal from "./elements/InfoAnimal";

interface DescriptionAnimalProps {
  animal: InterfaceAnimal;
}

const axiosAnimal = new AxiosAnimal();

export default function DescriptionAnimal({ animal }: DescriptionAnimalProps) {
  const [imageAnimals, setImagesAnimal] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (animal.id !== undefined) {
      axiosAnimal
        .listImageById(animal.id)
        .then((response) => {
          const animalImageResponse = response.map(
            (item) => item as InterfaceAnimalImage
          );

          const validImageUrls: string[] = [];
          for (let i = 0; i < animalImageResponse.length; i++) {
            if (typeof animalImageResponse[i].image === "string") {
              validImageUrls.push(animalImageResponse[i].image);
            }
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
