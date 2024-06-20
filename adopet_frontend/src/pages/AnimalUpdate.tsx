import * as React from "react";
import * as Router from "react-router-dom";
import AxiosAnimal from "../api/AxiosAnimal";
import UpdateAnimal from "../components/UpdateAnimal";
import AnimalImageUpload from "../components/UploadAnimalImage";
import FormLayout from "../components/layouts/FormLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageFile } from "../models/interfaces/animal/InterfaceAnimalImage";

export default function AnimalUpdate() {
  const location = Router.useLocation();
  const animalLocation = location.state.animal;
  const [messageError, setMessageError] = React.useState<string>("");
  const [registerStep, setRegisterStep] = React.useState<boolean>(true);
  const [animal, setAnimal] = React.useState<InterfaceAnimal>();
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    if (!animalLocation) {
      throw new Error("Animal não encontrado");
    }
    setAnimal(animalLocation);
  }, [animalLocation]);

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
            axiosAnimal.updateImage(image).catch((error) => {
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

  return (
    <FormLayout>
      {registerStep && (
        <UpdateAnimal
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
