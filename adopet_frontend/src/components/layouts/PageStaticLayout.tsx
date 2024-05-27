import Footer from "../modules/Footer";
import Header from "../modules/Header";
import MainStatic from "../elements/containers/MainStatic";
import Content from "../elements/containers/Content";

interface PageStaticLayoutProps {
  children: React.ReactNode;
}

export default function PageStaticLayout({ children }: PageStaticLayoutProps) {
  return (
    <MainStatic>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </MainStatic>
  );
}
