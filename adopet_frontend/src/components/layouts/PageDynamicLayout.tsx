import Footer from "../modules/Footer";
import Header from "../modules/Header";
import Main from "../elements/containers/Main";
import Content from "../elements/containers/Content";

interface PageDynamicLayoutProps {
  children: React.ReactNode;
  bgcolor?: string;
  color?: string;
}

export default function PageDynamicLayout({
  children,
  bgcolor,
  color,
}: PageDynamicLayoutProps) {
  return (
    <Main bgcolor={bgcolor} color={color}>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Main>
  );
}
