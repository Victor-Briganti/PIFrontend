import * as React from "react";
import RegisterAnimal from "../components/RegisterAnimal";
import AnimalImageUpload from "../components/AnimalImageUpload";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import ModelAnimal from "../models/Animal";
import ModelAnimalImage from "../models/AnimalImage";
import AxiosAnimal from "../api/AxiosAnimal";
import { useNavigate } from "react-router-dom";

const axiosAnimal = new AxiosAnimal();

export default function AnimalRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [registerStep, setRegisterStep] = React.useState<boolean>(true);
  const animalRef = React.useRef<ModelAnimal | null>(null);
  const navigate = useNavigate();

  const handleRegisterStep = (newAnimal: ModelAnimal) => {
    animalRef.current = newAnimal;
    setRegisterStep(false);
  };

  const handleUploadStep = async (animalImages: ModelAnimalImage[]) => {
    if (animalRef && animalRef.current) {
      const animal = animalRef.current;

      const response = await axiosAnimal
        .registerAnimal(animal)
        .catch((error) => {
          setMessageError(
            "Erro ao carregar ao salvar o animal. Tente novamente."
          );
        });

      for (let i = 0; i < animalImages.length; i++) {
        const image = animalImages[i];
        image.setAnimal(response.id);
        axiosAnimal.uploadImage(image).catch((error) => {
          setMessageError("Erro ao enviar imagem");
        });
      }
      navigate("/");
    }
    setMessageError("Animal inexistente");
  };

  return (
    <Main>
      <Content>
        {registerStep && (
          <RegisterAnimal
            messageError={messageError}
            setMessageError={setMessageError}
            animalRef={animalRef}
            handleRegisterStep={handleRegisterStep}
          />
        )}
        {!registerStep && (
          <AnimalImageUpload
            messageError={messageError}
            setMessageError={setMessageError}
            handleUploadStep={handleUploadStep}
          />
        )}
      </Content>
    </Main>
  );
}
