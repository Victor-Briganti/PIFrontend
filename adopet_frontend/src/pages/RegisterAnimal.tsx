import * as React from "react";
import * as MUI from "@mui/material";
import FormAnimal from "../components/forms/Animal";
import ModelAnimal from "../models/Animal";

interface RegisterAnimalProps {
  animalRef: React.MutableRefObject<ModelAnimal | null>;
  handleRegisterStep: (animal: ModelAnimal) => void;
}

export default function RegisterAnimal({
  animalRef,
  handleRegisterStep,
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
  const [messageError, setMessageError] = React.useState<string>("");

  React.useEffect(() => {
    if (animalRef && animalRef.current) {
      const animal = animalRef.current;
      setName(animal.getName());
      setWeight(animal.getWeight());
      setSpecie(animal.getSpecie());
      setGender(animal.getGender());
      setSize(animal.getSize());
      setAge(animal.getAge());
      setDescription(animal.getDescription() ?? "");
      setTemperament(animal.getTemperament() ?? "");
      setHouseTrained(animal.getIsHouseTrained() ?? false);
      setCastrated(animal.getIsCastrated() ?? false);
      setSpecialNeeds(animal.getIsSpecialNeeds() ?? false);
      setVaccinated(animal.getIsVaccinated() ?? false);
      setCoat(animal.getCoat());
    }
  }, [animalRef]);

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
      const newAnimal = new ModelAnimal({
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
        is_active: false,
      });

      handleRegisterStep(newAnimal);
    } catch (error) {
      setMessageError(error.message);
    }
  };

  return (
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
  );
}
