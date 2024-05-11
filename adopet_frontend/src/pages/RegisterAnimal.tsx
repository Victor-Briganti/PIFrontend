import * as React from "react";
import * as MUI from "@mui/material";
import AxiosAnimal from "../api/AxiosAnimal";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import FormAnimal from "../components/forms/Animal";
import ModelAnimal from "../models/Animal";

const axiosAnimal = new AxiosAnimal();

export default function RegisterAnimal() {
  const [messageError, setMessageError] = React.useState<string>("");

  const [specie, setSpecie] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("");
  const [size, setSize] = React.useState<string>("");
  const [age, setAge] = React.useState<string>("");
  const [coat, setCoat] = React.useState<string>("");
  const [isHouseTrained, setHouseTrained] = React.useState<boolean>(false);
  const [isSpecialNeeds, setSpecialNeeds] = React.useState<boolean>(false);
  const [isVaccinated, setVaccinated] = React.useState<boolean>(false);
  const [isCastrated, setCastrated] = React.useState<boolean>(false);

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

    const formData = new FormData(event.currentTarget);
    formData.append("size", size);
    formData.append("gender", gender);
    formData.append("specie", specie);
    formData.append("age", age);
    formData.append("coat", coat);
    formData.append("is_house_trained", isHouseTrained.toString());
    formData.append("is_special_needs", isSpecialNeeds.toString());
    formData.append("is_vaccinated", isVaccinated.toString());
    formData.append("is_castrated", isCastrated.toString());

    let weight;
    if (formData.get("weight") === undefined) {
      weight = undefined;
    } else {
      weight = parseInt(formData.get("weight")?.toString() ?? "-1");
    }

    try {
      const animal = new ModelAnimal({
        name: formData.get("name")?.toString() ?? "",
        age: formData.get("age")?.toString() ?? "",
        size: formData.get("size")?.toString() ?? "",
        gender: formData.get("gender")?.toString() ?? "",
        specie: formData.get("specie")?.toString() ?? "",
        coat: formData.get("coat")?.toString() ?? "",
        weight: weight,
        description: formData.get("description")?.toString(),
        temperament: formData.get("temperament")?.toString(),
        is_house_trained: (formData.get("is_house_trained") ===
          "true") as boolean,
        is_special_needs: (formData.get("is_special_needs") ===
          "true") as boolean,
        is_vaccinated: (formData.get("is_vaccinated") === "true") as boolean,
        is_adopted: (formData.get("is_adopted") === "true") as boolean,
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
          specie={specie}
          gender={gender}
          size={size}
          age={age}
          coat={coat}
          isHouseTrained={isHouseTrained}
          isSpecialNeeds={isSpecialNeeds}
          isVaccinated={isVaccinated}
          isCastrated={isCastrated}
          handleSpecie={handleSpecie}
          handleGender={handleGender}
          handleSize={handleSize}
          handleAge={handleAge}
          handleCoat={handleCoat}
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
