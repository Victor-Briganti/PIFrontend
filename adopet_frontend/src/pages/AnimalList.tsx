import GridAnimal from "../components/AnimalGrid";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Content from "../components/container/Content";
import Main from "../components/container/Main";

export default function AnimalList() {
  return (
    <Main>
      <Header />
      <Content>
        <GridAnimal />
      </Content>
      <Footer />
    </Main>
  );
}