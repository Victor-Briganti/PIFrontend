import * as React from "react";
import * as MUI from "@mui/material";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import FormAnimal from "../components/forms/Animal";

export default function RegisterAnimal() {
  // Estado para os principais campos do animal
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

  const handleHouseTrained = (event: MUI.SelectChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setHouseTrained(target.checked);
  };

  const handleSpecialNeeds = (event: MUI.SelectChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setSpecialNeeds(target.checked);
  };

  const handleVaccinated = (event: MUI.SelectChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setVaccinated(target.checked);
  };

  const handleCastrated = (event: MUI.SelectChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setCastrated(target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Teste");
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
        />
      </Content>
    </Main>
  );
}
