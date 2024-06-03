import * as React from "react";
import * as Router from "react-router-dom";
import AxiosAnimal from "../api/AxiosAnimal";
import RegisterAnimal from "../components/RegisterAnimal";
import AnimalImageUpload from "../components/UploadAnimalImage";
import FormLayout from "../components/layouts/FormLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageFile } from "../models/interfaces/animal/InterfaceAnimalImage";
import ErrorLayout from "../components/layouts/ErrorLayout";

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
      let hasImages = false;

      if (animal) {
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
          return;
        }
      }
      setMessageError("Animal inexistente");
    },
    [animal, navigate]
  );

  if (animal === undefined) {
    return (
      <ErrorLayout>
        <h1>Animal não pode ser carregado</h1>
      </ErrorLayout>
    );
  }

  return (
    <FormLayout>
      {registerStep && (
        <RegisterAnimal
          messageError={messageError}
          setMessageError={setMessageError}
          animal={animal}
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
    </FormLayout>
  );
}
