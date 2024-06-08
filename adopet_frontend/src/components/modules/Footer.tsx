import * as MUI from "@mui/material";

import {
  Email,
  Facebook,
  Instagram,
  LocationOn,
  Phone,
  Twitter,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <MUI.Grid
      container
      spacing={2}
      justifyContent={"center"}
      alignItems={"end"}
      sx={{
        marginX: "0px",
        padding: 3,
        backgroundColor: "black",
        width: "100%",
      }}
    >
      <MUI.Grid item xs={"auto"} color={"HighlightText"}>
        {/* Nome do site */}
        <MUI.Typography
          variant="h5"
          component={"strong"}
          color="inherit"
          noWrap
        >
          UTFPR CAMPO MOURÃO
        </MUI.Typography>

        <br />
        <br />
        <br />

        {/* Endereço */}
        <MUI.Typography
          variant="caption"
          component={"i"}
          color="inherit"
          noWrap
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>
              <LocationOn fontSize="small" />
            </div>

            <div>Via Rosalina Maria dos Santos, 1233</div>
          </div>
        </MUI.Typography>

        {/* CEP */}
        <MUI.Typography
          variant="caption"
          component={"i"}
          color="inherit"
          noWrap
        >
          87301-899 Campo Mourão - PR - Brasil
        </MUI.Typography>
      </MUI.Grid>

      {/* Copyright */}
      <MUI.Grid item xs flexGrow={1}>
        <MUI.Typography variant="body2" color={"HighlightText"} align="center">
          {"Copyright © "}
          <MUI.Link color="inherit" href="/#">
            Adopet
          </MUI.Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </MUI.Typography>
      </MUI.Grid>

      <MUI.Grid item xs={"auto"} color={"HighlightText"}>
        <MUI.Typography
          variant="h5"
          component={"strong"}
          color="inherit"
          noWrap
        >
          CONTATO
        </MUI.Typography>

        <br />

        <MUI.Typography
          variant="caption"
          component={"i"}
          color="inherit"
          noWrap
        >
          Redes Sociais
        </MUI.Typography>

        <br />

        {/* Icones da rede social */}
        <MUI.Typography variant="caption" color="inherit" noWrap>
          <MUI.IconButton color="inherit">
            <Instagram fontSize="small" />
          </MUI.IconButton>

          <MUI.IconButton color="inherit">
            <Facebook fontSize="small" />
          </MUI.IconButton>

          <MUI.IconButton color="inherit">
            <Twitter fontSize="small" />
          </MUI.IconButton>
        </MUI.Typography>

        <br />

        {/* Telefone */}
        <MUI.Typography
          variant="caption"
          component={"i"}
          color="inherit"
          noWrap
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>
              <Phone fontSize="small" />
            </div>

            <div>&nbsp; Fone: +44 99999-9999</div>
          </div>
        </MUI.Typography>

        {/* Email */}
        <MUI.Typography
          variant="caption"
          component={"i"}
          color="inherit"
          noWrap
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>
              <Email fontSize="small" />
            </div>

            <div>&nbsp; Email: adopetcontato@email.com</div>
          </div>
        </MUI.Typography>
      </MUI.Grid>
    </MUI.Grid>
  );
}
