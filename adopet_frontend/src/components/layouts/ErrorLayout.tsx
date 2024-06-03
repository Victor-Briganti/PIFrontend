import MainError from "../elements/containers/MainError";

interface FormLayoutProps {
  children: React.ReactNode;
}

export default function ErrorLayout({ children }: FormLayoutProps) {
  return <MainError>{children}</MainError>;
}
