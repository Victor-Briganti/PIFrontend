import * as React from "react";
import * as MUI from "@mui/material";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageLink } from "../models/interfaces/animal/InterfaceAnimalImage";
import AxiosAnimal from "../api/AxiosAnimal";
import Slider from "./elements/Slider";
import InfoDonorAnimal from "./elements/InfoDonorAnimal";

interface DescriptionDonorAnimalProps {
  animal: InterfaceAnimal;
}

export default function DescriptionDonorAnimal({
  animal,
}: DescriptionDonorAnimalProps) {
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
      <MUI.Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        paddingTop={"15%"}
      >
        <MUI.Typography variant={"h3"}>
          <b>Carregando</b>
        </MUI.Typography>
      </MUI.Box>
    );
  }

  if (imageAnimals.length === 0) {
    return (
      <MUI.Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        paddingTop={"15%"}
      >
        <MUI.Typography variant={"h3"}>
          <b>O animal não pode ser carregado.</b>
        </MUI.Typography>
      </MUI.Box>
    );
  }

  return (
    <React.Fragment>
      <Slider banners={imageAnimals} />
      <InfoDonorAnimal animal={animal} />
    </React.Fragment>
  );
}
