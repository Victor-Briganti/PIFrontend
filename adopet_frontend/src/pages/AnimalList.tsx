import GridAnimal from "../components/GridAnimal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Content from "../components/elements/container/Content";
import Main from "../components/container/Main";

export default function AnimalList() {
  return (
    <Main bgcolor="secondary.light" color="primary.contrastText">
      <Header />
      <Content>
        <GridAnimal />
      </Content>
      <Footer />
    </Main>
  );
}
