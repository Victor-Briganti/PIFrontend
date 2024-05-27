import * as React from "react";
import { useLocation } from "react-router-dom";
import DescriptionAnimal from "../components/DescriptionAnimal";
import PageDynamicLayout from "../components/layouts/PageDynamicLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";

export default function AnimalProfile() {
  const [animal, setAnimal] = React.useState<InterfaceAnimal | undefined>(
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

  return (
    <PageDynamicLayout bgcolor="secondary.light" color="primary.contrastText">
      <DescriptionAnimal animal={animal} />
    </PageDynamicLayout>
  );
}
