import * as React from "react";
import * as MUI from "@mui/material";
import AxiosAnimal from "../api/AxiosAnimal";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import FormAnimal from "../components/forms/Animal";
import ModelAnimal from "../models/Animal";

const axiosAnimal = new AxiosAnimal();

export default function RegisterAnimal() {
  const [name, setName] = React.useState<string>("");
  const [weight, setWeight] = React.useState<number>(-1);
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
  const [messageError, setMessageError] = React.useState<string>("");

  const handleName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setName(event.target.value);

  const handleWeight = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const weight = parseFloat(event.target.value);
    if (isNaN(weight) || weight < 0) {
      setMessageError("Valor do peso inválido");
      return;
    }
    setWeight(weight);
  };

  const handleSpecie = (event: MUI.SelectChangeEvent) =>
    setSpecie(event.target.value);

  const handleGender = (event: MUI.SelectChangeEvent) =>
    setGender(event.target.value);

  const handleSize = (event: MUI.SelectChangeEvent) =>
    setSize(event.target.value);

  const handleAge = (event: MUI.SelectChangeEvent) =>
    setAge(event.target.value);

  const handleCoat = (event: MUI.SelectChangeEvent) =>
    setCoat(event.target.value);

  const handleDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setDescription(event.target.value);

  const handleTemperament = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTemperament(event.target.value);

  const handleHouseTrained = (event: React.ChangeEvent<Element>) => {
    const target = event.target as HTMLInputElement;
    setHouseTrained(target.checked);
  };

  const handleSpecialNeeds = (event: React.ChangeEvent<Element>) => {
    const target = event.target as HTMLInputElement;
    setSpecialNeeds(target.checked);
  };

  const handleVaccinated = (event: React.ChangeEvent<Element>) => {
    const target = event.target as HTMLInputElement;
    setVaccinated(target.checked);
  };

  const handleCastrated = (event: React.ChangeEvent<Element>) => {
    const target = event.target as HTMLInputElement;
    setCastrated(target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const animal = new ModelAnimal({
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
        is_adopted: false,
        is_active: false,
      });

      await axiosAnimal.registerAnimal(animal).catch((error) => {
        setMessageError(
          "Erro ao carregar ao salvar o animal. Tente novamente."
        );
      });
    } catch (error) {
      setMessageError(error.message);
    }
  };

  return (
    <Main>
      <Content>
        <FormAnimal
          name={name}
          weight={weight}
          specie={specie}
          gender={gender}
          size={size}
          age={age}
          coat={coat}
          description={description}
          temperament={temperament}
          isHouseTrained={isHouseTrained}
          isSpecialNeeds={isSpecialNeeds}
          isVaccinated={isVaccinated}
          isCastrated={isCastrated}
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
      </Content>
    </Main>
  );
}
