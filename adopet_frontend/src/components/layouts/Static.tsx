import Footer from "../modules/Footer";
import Header from "../modules/Header";
import MainStatic from "../elements/containers/MainStatic";
import Content from "../elements/containers/Content";

interface StaticProps {
  children: React.ReactNode;
}

export default function Static({ children }: StaticProps) {
  return (
    <MainStatic>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </MainStatic>
  );
}
