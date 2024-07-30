import * as React from "react";
import * as Router from "react-router-dom";
import AxiosAnimal from "../api/AxiosAnimal";
import RegisterAnimal from "../components/RegisterAnimal";
import AnimalImageUpload from "../components/UploadAnimalImage";
import FormLayout from "../components/layouts/FormLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageFile } from "../models/interfaces/animal/InterfaceAnimalImage";
import TopArrowBack from "../components/elements/navigation/TopArrowBack";

export default function AnimalRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [registerStep, setRegisterStep] = React.useState<boolean>(true);
  const [animal, setAnimal] = React.useState<InterfaceAnimal>();
  const navigate = Router.useNavigate();

  const handleRegisterStep = React.useCallback((newAnimal: InterfaceAnimal) => {
    setAnimal(newAnimal);
    setRegisterStep(false);
  }, []);

  const handleUploadStep = React.useCallback(
    async (animalImages: InterfaceAnimalImageFile[]) => {
      const axiosAnimal = new AxiosAnimal();

      if (animal) {
        for (let i = 0; i < animalImages.length; i++) {
          const image = animalImages[i];
          axiosAnimal.uploadImage(image).catch((error) => {
            setMessageError("Erro ao enviar imagem");
            return;
          });
        }

        navigate("/");
        return;
      }
      setMessageError("Animal inexistente");
    },
    [animal, navigate]
  );

  return (
    <FormLayout>
      {registerStep && (
        <React.Fragment>
          <TopArrowBack />
          <RegisterAnimal
            messageError={messageError}
            setMessageError={setMessageError}
            animal={animal}
            handleRegisterStep={handleRegisterStep}
          />
        </React.Fragment>
      )}

      {!registerStep && (
        <React.Fragment>
          <TopArrowBack />
          <AnimalImageUpload
            messageError={messageError}
            animalName={animal?.name}
            setMessageError={setMessageError}
            handleUploadStep={handleUploadStep}
          />
        </React.Fragment>
      )}
    </FormLayout>
  );
}
