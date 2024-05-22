import * as React from "react";
import { useLocation } from "react-router-dom";
import ModelAnimal from "../models/Animal";

export default function AnimalProfile() {
  const [animal, setAnimal] = React.useState<ModelAnimal | undefined>(
    undefined
  );
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && location.state.animal) {
      setAnimal(location.state.animal);
    }
  }, [location]);

  if (animal === undefined) {
    return <h1>Animal não pode ser carregado</h1>;
  }

  return <h1>Animal</h1>;
}
