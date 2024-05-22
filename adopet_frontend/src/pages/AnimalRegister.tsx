import * as React from "react";
import { useNavigate } from "react-router-dom";
import AxiosAnimal from "../api/AxiosAnimal";
import RegisterAnimal from "../components/RegisterAnimal";
import AnimalImageUpload from "../components/UploadAnimalImage";
import Content from "../components/container/Content";
import Main from "../components/container/Main";
import InterfaceAnimal from "../models/Animal";
import InterfaceAnimalImage from "../models/AnimalImage";

const axiosAnimal = new AxiosAnimal();

export default function AnimalRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [registerStep, setRegisterStep] = React.useState<boolean>(true);
  const animalRef = React.useRef<InterfaceAnimal | null>(null);
  const navigate = useNavigate();

  const handleRegisterStep = (newAnimal: InterfaceAnimal) => {
    animalRef.current = newAnimal;
    setRegisterStep(false);
  };

  const handleUploadStep = async (animalImages: InterfaceAnimalImage[]) => {
    if (animalRef && animalRef.current) {
      const animal = animalRef.current;

      const response = await axiosAnimal
        .registerAnimal(animal)
        .catch((error) => {
          setMessageError(
            "Erro ao carregar ao salvar o animal. Tente novamente."
          );
        });

      if (response && response.id) {
        for (let i = 0; i < animalImages.length; i++) {
          const image = animalImages[i];
          image.animal = response.id;
          axiosAnimal.uploadImage(image).catch((error) => {
            setMessageError("Erro ao enviar imagem");
          });
        }
        navigate("/");
      }
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
