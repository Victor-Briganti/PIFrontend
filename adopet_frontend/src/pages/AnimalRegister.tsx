import * as React from "react";
import * as Router from "react-router-dom";
import AxiosAnimal from "../api/AxiosAnimal";
import RegisterAnimal from "../components/RegisterAnimal";
import AnimalImageUpload from "../components/UploadAnimalImage";
import FormLayout from "../components/layouts/FormLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageFile } from "../models/interfaces/animal/InterfaceAnimalImage";

export default function AnimalRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [registerStep, setRegisterStep] = React.useState<boolean>(true);
  const animalRef = React.useRef<InterfaceAnimal | null>(null);
  const axiosAnimal = React.useMemo(() => new AxiosAnimal(), []);
  const navigate = Router.useNavigate();

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
    <FormLayout>
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
    </FormLayout>
  );
}
