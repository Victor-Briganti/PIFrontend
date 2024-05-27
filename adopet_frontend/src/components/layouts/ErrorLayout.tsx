import MainError from "../elements/containers/MainError";
import Content from "../elements/containers/Content";

interface FormLayoutProps {
  children: React.ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return <MainError>{children}</MainError>;
}
