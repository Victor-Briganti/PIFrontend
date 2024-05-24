import * as React from "react";
import { useLocation } from "react-router-dom";
import DescriptionAnimal from "../components/DescriptionAnimal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Content from "../components/container/Content";
import Main from "../components/container/Main";
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
    <Main>
      <Header />
      <Content>
        <DescriptionAnimal animal={animal} />
      </Content>
      <Footer />
    </Main>
  );
}
