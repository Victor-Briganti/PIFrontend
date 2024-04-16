import * as React from "react";
import * as MUI from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Carousel from "react-material-ui-carousel";
import Main from "./Main";

// Define your banners here
const banners = [
  "public/banner1.webp",
  "public/banner2.webp",
  "public/banner3.webp",
  "public/banner4.webp",
];

export default function Home() {
  return (
    <Main height="200vh" bgcolor="secondary.light" color="primary.contrastText">
      <Header />
      <MUI.CssBaseline />
      <MUI.Container
        component="main"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          bgcolor: "background.paper",
          color: "text.primary",
          padding: 2,
          borderRadius: 1,
          marginTop: "auto",
          marginBottom: "auto",
          paddingTop: "100px",
          paddingBottom: "20px",
          flexGrow: 1,
          height: "1000vh",
        }}
      >
        <Carousel
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          {banners.map((banner, index) => (
            <MUI.Box
              component="img"
              sx={{
                width: "100%",
                height: "700px",
                objectFit: "cover",
              }}
              src={banner}
              alt={`Slide ${index}`}
            />
          ))}
        </Carousel>
        <MUI.Typography variant="h4" gutterBottom textAlign="center">
          Por que adotar um animal de estimação?
        </MUI.Typography>
        <MUI.Typography variant="h5" paragraph textAlign="left">
          Dar um lar para quem precisa:
        </MUI.Typography>
        <MUI.Typography variant="body1" paragraph textAlign="left">
          Ao adotar um animal, você abre espaço no seu coração e na sua casa
          para um serzinho que precisa muito de amor e carinho. Inúmeros cães e
          gatos vivem em situação de abandono, sem acesso a comida, abrigo e
          cuidados veterinários. Adotar significa oferecer a eles uma segunda
          chance de vida, um lar seguro e feliz.
        </MUI.Typography>
        <MUI.Typography variant="h5" paragraph textAlign="left">
          Receber amor incondicional:
        </MUI.Typography>
        <MUI.Typography variant="body1" paragraph textAlign="left">
          Os animais de estimação são seres extremamente afetuosos e leais. Ao
          adotar um, você ganhará um companheiro fiel para todas as horas, que
          te receberá sempre com entusiasmo e alegria. O amor que eles oferecem
          é puro e incondicional, capaz de trazer mais felicidade e significado
          para a sua vida.
        </MUI.Typography>
        <MUI.Typography variant="h5" paragraph textAlign="left">
          Melhorar sua saúde física e mental:
        </MUI.Typography>
        <MUI.Typography variant="body1" paragraph textAlign="left">
          Cuidar de um animal de estimação traz diversos benefícios para a
          saúde. Os passeios com o cachorro, por exemplo, te incentivam a se
          exercitar mais, combatendo o sedentarismo e melhorando o
          condicionamento físico. Além disso, a companhia de um animal pode
          reduzir o estresse, a ansiedade e a sensação de solidão,
          proporcionando mais bem-estar mental.
        </MUI.Typography>
        <MUI.Typography variant="h5" paragraph textAlign="left">
          Ensinar responsabilidade:
        </MUI.Typography>
        <MUI.Typography variant="body1" paragraph textAlign="left">
          Adotar um animal é uma grande responsabilidade. É preciso cuidar da
          alimentação, higiene, saúde e bem-estar do seu pet. Essa experiência
          pode ser muito valiosa, principalmente para crianças, que aprendem a
          cuidar de outro ser vivo e desenvolvem valores como a compaixão e o
          respeito.
        </MUI.Typography>
        <MUI.Typography variant="h5" paragraph textAlign="left">
          Transformar a vida de um animal:
        </MUI.Typography>
        <MUI.Typography variant="body1" paragraph textAlign="left">
          A adoção é um ato de amor que pode transformar a vida de um animal
          para sempre. Ao abrir seu lar e seu coração, você estará dando a ele a
          chance de ter uma vida feliz, saudável e cheia de amor.
        </MUI.Typography>
        <MUI.Typography variant="h5" paragraph textAlign="left">
          Adotar é mais do que ter um animal de estimação, é fazer a diferença
          no mundo.
        </MUI.Typography>
        <MUI.Typography variant="body1" paragraph textAlign="left">
          Lembre-se: antes de adotar, pondere se você tem condições de oferecer
          ao animal tudo o que ele precisa. Adotar um animal é um compromisso de
          longo prazo, que exige tempo, amor e dedicação.
        </MUI.Typography>
      </MUI.Container>
      <Footer />
    </Main>
  );
}
