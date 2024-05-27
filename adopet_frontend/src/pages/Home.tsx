import * as MUI from "@mui/material";
import PageStaticLayout from "../components/layouts/PageStaticLayout";
import Slider from "../components/elements/Slider";

const banners = [
  "src/assets/banner1.webp",
  "src/assets/banner2.webp",
  "src/assets/banner3.webp",
  "src/assets/banner4.webp",
];

export default function Home() {
  return (
    <PageStaticLayout>
      <Slider banners={banners} />
      <MUI.Typography variant="h4" gutterBottom textAlign="center">
        Por que adotar um animal de estimação?
      </MUI.Typography>
      <MUI.Typography variant="h5" paragraph textAlign="left">
        Dar um lar para quem precisa:
      </MUI.Typography>
      <MUI.Typography
        variant="h6"
        paragraph
        sx={{ textAlign: "justify", width: "100%" }}
      >
        Ao adotar um animal, você abre espaço no seu coração e na sua casa para
        um serzinho que precisa muito de amor e carinho. Inúmeros cães e gatos
        vivem em situação de abandono, sem acesso a comida, abrigo e cuidados
        veterinários. Adotar significa oferecer a eles uma segunda chance de
        vida, um lar seguro e feliz.
      </MUI.Typography>
      <MUI.Typography variant="h5" paragraph textAlign="left">
        Receber amor incondicional:
      </MUI.Typography>
      <MUI.Typography
        variant="h6"
        paragraph
        sx={{ textAlign: "justify", width: "100%" }}
      >
        Os animais de estimação são seres extremamente afetuosos e leais. Ao
        adotar um, você ganhará um companheiro fiel para todas as horas, que te
        receberá sempre com entusiasmo e alegria. O amor que eles oferecem é
        puro e incondicional, capaz de trazer mais felicidade e significado para
        a sua vida.
      </MUI.Typography>
      <MUI.Typography variant="h5" paragraph textAlign="left">
        Melhorar sua saúde física e mental:
      </MUI.Typography>
      <MUI.Typography
        variant="h6"
        paragraph
        sx={{ textAlign: "justify", width: "100%" }}
      >
        Cuidar de um animal de estimação traz diversos benefícios para a saúde.
        Os passeios com o cachorro, por exemplo, te incentivam a se exercitar
        mais, combatendo o sedentarismo e melhorando o condicionamento físico.
        Além disso, a companhia de um animal pode reduzir o estresse, a
        ansiedade e a sensação de solidão, proporcionando mais bem-estar mental.
      </MUI.Typography>
      <MUI.Typography variant="h5" paragraph textAlign="left">
        Ensinar responsabilidade:
      </MUI.Typography>
      <MUI.Typography
        variant="h6"
        paragraph
        sx={{ textAlign: "justify", width: "100%" }}
      >
        Adotar um animal é uma grande responsabilidade. É preciso cuidar da
        alimentação, higiene, saúde e bem-estar do seu pet. Essa experiência
        pode ser muito valiosa, principalmente para crianças, que aprendem a
        cuidar de outro ser vivo e desenvolvem valores como a compaixão e o
        respeito.
      </MUI.Typography>
      <MUI.Typography variant="h5" paragraph textAlign="left">
        Transformar a vida de um animal:
      </MUI.Typography>
      <MUI.Typography
        variant="h6"
        paragraph
        sx={{ textAlign: "justify", width: "100%" }}
      >
        A adoção é um ato de amor que pode transformar a vida de um animal para
        sempre. Ao abrir seu lar e seu coração, você estará dando a ele a chance
        de ter uma vida feliz, saudável e cheia de amor.
      </MUI.Typography>
      <MUI.Typography variant="h5" paragraph textAlign="left">
        Adotar é mais do que ter um animal de estimação, é fazer a diferença no
        mundo.
      </MUI.Typography>
      <MUI.Typography
        variant="h6"
        paragraph
        sx={{ textAlign: "justify", width: "100%" }}
      >
        Lembre-se: antes de adotar, pondere se você tem condições de oferecer ao
        animal tudo o que ele precisa. Adotar um animal é um compromisso de
        longo prazo, que exige tempo, amor e dedicação.
      </MUI.Typography>
    </PageStaticLayout>
  );
}
