import * as MUI from "@mui/material";
import * as React from "react";
import AxiosAnimal from "../api/AxiosAnimal";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import AgeChoiceMap from "../models/map_choices/AgeChoiceMap";
import CoatChoiceMap from "../models/map_choices/CoatChoiceMap";
import GenderChoiceMap from "../models/map_choices/GenderChoiceMap";
import SizeChoiceMap from "../models/map_choices/SizeChoiceMap";
import SpecieChoiceMap from "../models/map_choices/SpecieChoiceMap";
import TopArrowBack from "./elements/navigation/TopArrowBack";
import FormAnimalUpdate from "./forms/FormAnimalUpdate";

interface RegisterAnimalProps {
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  animal: InterfaceAnimal | undefined;
  handleRegisterStep: (animal: InterfaceAnimal) => void;
}

export default function RegisterAnimal({
  messageError,
  setMessageError,
  animal,
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
  const axiosAnimal = React.useMemo(() => new AxiosAnimal(), []);

  React.useEffect(() => {
    const ageMap = new AgeChoiceMap();
    const specieMap = new SpecieChoiceMap();
    const genderMap = new GenderChoiceMap();
    const sizeMap = new SizeChoiceMap();
    const coatMap = new CoatChoiceMap();

    if (animal) {
      setName(animal.name);
      setWeight(animal.weight);
      setDescription(animal.description ?? "");
      setTemperament(animal.temperament ?? "");
      setHouseTrained(animal.is_house_trained ?? false);
      setCastrated(animal.is_castrated ?? false);
      setSpecialNeeds(animal.is_special_needs ?? false);
      setVaccinated(animal.is_vaccinated ?? false);

      if (animal.age !== undefined) {
        const ageValue = ageMap.getValueByKey(animal.age);
        if (ageValue !== undefined) setAge(ageValue);
      }

      if (animal.specie !== undefined) {
        const specieValue = specieMap.getValueByKey(animal.specie);
        if (specieValue !== undefined) setSpecie(specieValue);
      }

      if (animal.gender !== undefined) {
        const genderValue = genderMap.getValueByKey(animal.gender);
        if (genderValue !== undefined) setGender(genderValue);
      }

      if (animal.size !== undefined) {
        const sizeValue = sizeMap.getValueByKey(animal.size);
        if (sizeValue !== undefined) setSize(sizeValue);
      }

      if (animal.coat !== undefined) {
        const coatValue = coatMap.getValueByKey(animal.coat);
        if (coatValue !== undefined) setCoat(coatValue);
      }
    }
  }, [animal]);

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

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (animal === undefined || animal.id === undefined)
        setMessageError("Animal não pode ser atualizado");

      const ageMap = new AgeChoiceMap();
      const specieMap = new SpecieChoiceMap();
      const genderMap = new GenderChoiceMap();
      const sizeMap = new SizeChoiceMap();
      const coatMap = new CoatChoiceMap();

      let ageKey = ageMap.getKeyByValue(age) ?? age;
      let specieKey = specieMap.getKeyByValue(specie) ?? specie;
      let genderKey = genderMap.getKeyByValue(gender) ?? gender;
      let sizeKey = sizeMap.getKeyByValue(size) ?? size;
      let coatKey = coatMap.getKeyByValue(coat) ?? coat;

      const newAnimal = {
        id: animal?.id,
        name: name,
        age: ageKey,
        size: sizeKey,
        gender: genderKey,
        specie: specieKey,
        coat: coatKey,
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
        const response = await axiosAnimal.updateAnimal(newAnimal);
        setMessageError("");
        handleRegisterStep(response);
      } catch (error) {
        setMessageError(error.message);
      }
    },
    [
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
      axiosAnimal,
      handleRegisterStep,
      setMessageError,
    ]
  );

  return (
    <React.Fragment>
      <TopArrowBack />
      <FormAnimalUpdate
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
    </React.Fragment>
  );
}
