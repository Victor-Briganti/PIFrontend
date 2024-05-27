import * as React from "react";
import Footer from "../modules/Footer";
import Header from "../modules/Header";
import Main from "../elements/containers/Main";
import Content from "../elements/containers/Content";

interface PageDynamicLayoutProps {
  children: React.ReactNode;
  bgcolor?: string;
  color?: string;
  content?: boolean;
}

export default function PageDynamicLayout({
  children,
  bgcolor,
  color,
  content = true,
}: PageDynamicLayoutProps) {
  return (
    <Main bgcolor={bgcolor} color={color}>
      <Header />
      {content ? (
        <Content>{children}</Content>
      ) : (
        <React.Fragment>{children} </React.Fragment>
      )}
      <Footer />
    </Main>
  );
}
