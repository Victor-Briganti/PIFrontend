import * as React from "react";
import * as MUI from "@mui/material";
import FormAnimal from "./forms/FormAnimal";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import TopArrowBack from "./elements/navigation/TopArrowBack";
import { InterfaceAnimalImageFile } from "../models/interfaces/animal/InterfaceAnimalImage";

interface RegisterAnimalProps {
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: (
    animal: InterfaceAnimal,
    image: InterfaceAnimalImageFile[]
  ) => void;
}

export default function RegisterAnimal({
  messageError,
  setMessageError,
  handleRegister,
}: RegisterAnimalProps) {
  const [name, setName] = React.useState<string>("");
  const [weight, setWeight] = React.useState<number | undefined>(undefined);
  const [specie, setSpecie] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("");
  const [size, setSize] = React.useState<string>("");
  const [age, setAge] = React.useState<string>("");
  const [coat, setCoat] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [temperament, setTemperament] = React.useState<string>("");
  const [isHouseTrained, setHouseTrained] = React.useState<boolean>(false);
  const [isSpecialNeeds, setSpecialNeeds] = React.useState<boolean>(false);
  const [isVaccinated, setVaccinated] = React.useState<boolean>(false);
  const [isCastrated, setCastrated] = React.useState<boolean>(false);
  const [animalImages, setAnimalImages] = React.useState<
    InterfaceAnimalImageFile[]
  >([]);

  const handleName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setName(event.target.value),
    [setName]
  );

  const handleWeight = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.target.value === "") {
        setWeight(undefined);
        return;
      }

      const weight = parseFloat(event.target.value);
      if (isNaN(weight) || weight < 0) {
        setMessageError("Valor do peso inválido");
        return;
      }

      setMessageError("");
      setWeight(weight);
    },
    [setWeight, setMessageError]
  );

  const handleSpecie = React.useCallback(
    (event: MUI.SelectChangeEvent) => setSpecie(event.target.value),
    [setSpecie]
  );

  const handleGender = React.useCallback(
    (event: MUI.SelectChangeEvent) => setGender(event.target.value),
    [setGender]
  );

  const handleSize = React.useCallback(
    (event: MUI.SelectChangeEvent) => setSize(event.target.value),
    [setSize]
  );

  const handleAge = React.useCallback(
    (event: MUI.SelectChangeEvent) => setAge(event.target.value),
    [setAge]
  );

  const handleCoat = React.useCallback(
    (event: MUI.SelectChangeEvent) => setCoat(event.target.value),
    [setCoat]
  );

  const handleDescription = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDescription(event.target.value),
    [setDescription]
  );

  const handleTemperament = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setTemperament(event.target.value),
    [setTemperament]
  );

  const handleHouseTrained = React.useCallback(
    (event: React.ChangeEvent<Element>) => {
      const target = event.target as HTMLInputElement;
      setHouseTrained(target.checked);
    },
    [setHouseTrained]
  );

  const handleSpecialNeeds = React.useCallback(
    (event: React.ChangeEvent<Element>) => {
      const target = event.target as HTMLInputElement;
      setSpecialNeeds(target.checked);
    },
    [setSpecialNeeds]
  );

  const handleVaccinated = React.useCallback(
    (event: React.ChangeEvent<Element>) => {
      const target = event.target as HTMLInputElement;
      setVaccinated(target.checked);
    },
    [setVaccinated]
  );

  const handleCastrated = React.useCallback(
    (event: React.ChangeEvent<Element>) => {
      const target = event.target as HTMLInputElement;
      setCastrated(target.checked);
    },
    [setCastrated]
  );

  const handleImages = React.useCallback(
    (
      imageUpdate: (
        prevImages: InterfaceAnimalImageFile[]
      ) => InterfaceAnimalImageFile[]
    ) => {
      setAnimalImages((prevImages) => imageUpdate(prevImages));
    },
    [setAnimalImages]
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (name === "") {
        setMessageError("Nome é um campo obrigatório");
        return;
      }

      if (weight === undefined) {
        setMessageError("Peso é um campo obrigatório");
        return;
      }

      if (specie === "") {
        setMessageError("Espécie é um campo obrigatório");
        return;
      }

      if (gender === "") {
        setMessageError("Genêro é um campo obrigatório");
        return;
      }

      if (age === "") {
        setMessageError("Idade é um campo obrigatório");
        return;
      }

      if (coat === "") {
        setMessageError("Pelagem é um campo obrigatório");
        return;
      }

      if (size === "") {
        setMessageError("Tamanho é um campo obrigatório");
        return;
      }

      const animal = {
        name: name,
        age: age,
        size: size,
        gender: gender,
        specie: specie,
        coat: coat,
        weight: weight,
        description: description,
        temperament: temperament,
        is_house_trained: isHouseTrained,
        is_special_needs: isSpecialNeeds,
        is_vaccinated: isVaccinated,
        is_castrated: isCastrated,
        is_adopted: false,
        is_active: true,
      } as InterfaceAnimal;

      try {
        handleRegister(animal, animalImages);
      } catch (error) {
        setMessageError(error.message);
      }
    },
    [
      animalImages,
      name,
      age,
      size,
      gender,
      specie,
      coat,
      weight,
      description,
      temperament,
      isHouseTrained,
      isSpecialNeeds,
      isVaccinated,
      isCastrated,
      handleRegister,
      setMessageError,
    ]
  );

  return (
    <React.Fragment>
      <TopArrowBack />
      <FormAnimal
        name={name}
        weight={weight}
        specie={specie}
        gender={gender}
        size={size}
        age={age}
        coat={coat}
        description={description}
        isHouseTrained={isHouseTrained}
        temperament={temperament}
        isSpecialNeeds={isSpecialNeeds}
        isVaccinated={isVaccinated}
        isCastrated={isCastrated}
        handleImages={handleImages}
        handleName={handleName}
        handleWeight={handleWeight}
        handleSpecie={handleSpecie}
        handleGender={handleGender}
        handleSize={handleSize}
        handleAge={handleAge}
        handleCoat={handleCoat}
        handleDescription={handleDescription}
        handleTemperament={handleTemperament}
        handleHouseTrained={handleHouseTrained}
        handleSpecialNeeds={handleSpecialNeeds}
        handleVaccinated={handleVaccinated}
        handleCastrated={handleCastrated}
        handleSubmit={handleSubmit}
        messageError={messageError}
      />
    </React.Fragment>
  );
}
