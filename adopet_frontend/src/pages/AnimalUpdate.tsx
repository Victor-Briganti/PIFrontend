import * as React from "react";
import * as Router from "react-router-dom";
import UpdateAnimal from "../components/UpdateAnimal";
import FormLayout from "../components/layouts/FormLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";

export default function AnimalUpdate() {
  const location = Router.useLocation();
  const animalLocation = location.state.animal;
  const [messageError, setMessageError] = React.useState<string>("");
  const [animal, setAnimal] = React.useState<InterfaceAnimal>();
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    if (!animalLocation) {
      throw new Error("Animal não encontrado");
    }
    setAnimal(animalLocation);
  }, [animalLocation]);

  const handleRegisterStep = React.useCallback(
    (newAnimal: InterfaceAnimal) => {
      navigate(-1);
    },
    [navigate]
  );

  return (
    <FormLayout>
      <UpdateAnimal
        messageError={messageError}
        setMessageError={setMessageError}
        animal={animal}
        handleRegisterStep={handleRegisterStep}
      />
    </FormLayout>
  );
}
