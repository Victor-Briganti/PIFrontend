import * as MUI from "@mui/material";
import { Link } from "react-router-dom";
import Static from "../components/layouts/Static";

export default function About() {
  const theme = MUI.useTheme();

  return (
    <Static>
      <MUI.Typography variant="h4" gutterBottom textAlign="left">
        Sobre o Adopet
      </MUI.Typography>
      <MUI.Typography variant="h6" paragraph textAlign="left">
        Aqui na Adopet, acreditamos firmemente que todos os animais de rua
        merecem um lar repleto de amor e cuidado. Nosso compromisso é unir esses
        animais que estão em abrigos com pessoas que estão prontas para oferecer
        a eles um lar verdadeiramente acolhedor.
      </MUI.Typography>
      <MUI.Typography variant="h6" paragraph textAlign="left">
        Desde o nosso início em 2024, nossa missão tem sido clara: dar
        visibilidade aos animais que aguardam por um lar em abrigos por todo o
        país. Ao longo desses anos, temos testemunhado milhares de histórias de
        sucesso, onde esses animais encontraram um lugar onde podem descansar
        tranquilos, brincar livremente e receber todo o amor e carinho que
        merecem! =^.^=
      </MUI.Typography>
      <MUI.Typography variant="h4" gutterBottom textAlign="left">
        Como Funciona
      </MUI.Typography>

      <MUI.Typography variant="h6" textAlign="justify">
        Cadastro e Publicação: ONGs, protetores independentes ou pessoas que
        desejam doar um animal podem cadastrar-se gratuitamente em nosso site e
        imediatamente publicar detalhes sobre os animais, incluindo suas
        características e personalidade.
      </MUI.Typography>
      <br />
      <MUI.Typography variant="h6" textAlign="justify">
        Busca Personalizada: Aqueles que desejam adotar podem navegar pelo nosso
        site em busca de um animal que se encaixe em seu estilo de vida e
        preferências.
      </MUI.Typography>
      <br />
      <MUI.Typography variant="h6" textAlign="justify">
        Processo de Adoção: Quando encontrarem um animal especial, basta clicar
        em “quero adotar” e entrar em contato com a ONG para combinar os
        detalhes da adoção.
      </MUI.Typography>
      <br />
      <MUI.Typography variant="h6" paragraph textAlign="left">
        Divulgue um Animal para Adoção: Se você está oferecendo um lar
        temporário ou deseja divulgar um animal para adoção, faça seu cadastro
        em nosso site e publique o perfil do animal. Quanto mais informações e
        fotos você fornecer, maiores serão as chances de encontrar um lar
        adequado, ajudando a evitar futuros abandonos.
      </MUI.Typography>
      <MUI.Typography variant="h6" paragraph textAlign="left">
        Importante: Nosso compromisso é com a adoção responsável. A venda de
        animais é estritamente proibida em nosso site. Usuários que tentarem
        comercializar animais serão banidos.
      </MUI.Typography>
      <MUI.Typography variant="h6" paragraph textAlign="left">
        <Link
          to="/animals"
          style={{
            color: theme.palette.primary.main,
            textDecoration: "none",
            paddingRight: "6px",
          }}
        >
          Adote um Amigo
        </Link>
        para conhecer os cães e gatos que estão ansiosos para encontrar um lar.
        Antes de tomar essa decisão importante, recomendamos que você leia
        nossas dicas sobre adoção para garantir que está preparado para receber
        um novo membro na família!
      </MUI.Typography>
    </Static>
  );
}
