import * as React from "react";
import * as Router from "react-router-dom";
import UpdateAnimal from "../components/UpdateAnimal";
import FormLayout from "../components/layouts/FormLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import UserContextNode from "../components/UserContextNode";

export default function AnimalUpdate() {
  const location = Router.useLocation();
  const animalLocation = location.state.animal;
  const [messageError, setMessageError] = React.useState<string>("");
  const [animal, setAnimal] = React.useState<InterfaceAnimal>();
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    if (!animalLocation) {
      setMessageError("Animal não encontrado");
      navigate("/animals"); // Redirect to some safe route if animal is not found
    } else {
      setAnimal(animalLocation);
    }
  }, [animalLocation, navigate]);

  const handleRegisterStep = React.useCallback(
    (_newAnimal: InterfaceAnimal) => {
      navigate(-1);
    },
    [navigate]
  );

  return (
    <UserContextNode>
      <FormLayout>
        <UpdateAnimal
          messageError={messageError}
          setMessageError={setMessageError}
          animal={animal}
          handleRegisterStep={handleRegisterStep}
        />
      </FormLayout>
    </UserContextNode>
  );
}
