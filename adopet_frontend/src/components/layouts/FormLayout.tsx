import Main from "../elements/containers/Main";
import Content from "../elements/containers/Content";

interface FormLayoutProps {
  children: React.ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <Main>
      <Content>{children}</Content>
    </Main>
  );
}
