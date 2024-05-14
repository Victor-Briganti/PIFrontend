import * as React from "react";
import RegisterAnimal from "./RegisterAnimal";
import AnimalImageUpload from "./AnimalImageUpload";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import ModelAnimal from "../models/Animal";

export default function AnimalRegister() {
  const [registerStep, setRegisterStep] = React.useState<boolean>(true);
  const animalRef = React.useRef<ModelAnimal | null>(null);

  const handleRegisterStep = (newAnimal: ModelAnimal) => {
    animalRef.current = newAnimal;
    setRegisterStep(false);
  };

  const handleUploadStep = () => {
    setRegisterStep(true);
  };

  return (
    <Main>
      <Content>
        {registerStep && (
          <RegisterAnimal
            animalRef={animalRef}
            handleRegisterStep={handleRegisterStep}
          />
        )}
        {!registerStep && (
          <AnimalImageUpload handleUploadStep={handleUploadStep} />
        )}
      </Content>
    </Main>
  );
}
