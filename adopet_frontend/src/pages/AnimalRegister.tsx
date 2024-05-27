import * as React from "react";
import { useNavigate } from "react-router-dom";
import AxiosAnimal from "../api/AxiosAnimal";
import RegisterAnimal from "../components/RegisterAnimal";
import AnimalImageUpload from "../components/UploadAnimalImage";
import Content from "../components/elements/containers/Content";
import Main from "../components/container/Main";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageFile } from "../models/interfaces/animal/InterfaceAnimalImage";

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

  const handleUploadStep = async (animalImages: InterfaceAnimalImageFile[]) => {
    let hasImages = false;
    if (animalRef && animalRef.current) {
      const animal = animalRef.current;

      if (animal && animal.id) {
        for (let i = 0; i < animalImages.length; i++) {
          const image = animalImages[i];
          image.animal = animal.id;
          console.log("Aqui");
          axiosAnimal.uploadImage(image).catch((error) => {
            setMessageError("Erro ao enviar imagem");
            return;
          });
          hasImages = true;
        }

        if (hasImages === false) {
          animal.is_active = false;
          axiosAnimal.updateAnimal(animal);
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
