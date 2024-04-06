import * as React from "react";
import * as MuiMaterial from "@mui/material";
import Copyright from "./CopyRight";
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
    <MuiMaterial.Grid
      container
      spacing={2}
      alignItems={"end"}
      sx={{
        position: "static",
        bottom: "0%",
        marginX: "0px",
        padding: 3,
        backgroundColor: "black",
        width: "100%",
      }}
    >
      <MuiMaterial.Grid item xs={"auto"} color={"HighlightText"}>
        <MuiMaterial.Typography
          variant="h5"
          component={"strong"}
          color="inherit"
          noWrap
        >
          UTFPR CAMPO MOURÃO
        </MuiMaterial.Typography>
        <br />
        <br />
        <br />
        <MuiMaterial.Typography
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
        </MuiMaterial.Typography>
        <MuiMaterial.Typography
          variant="caption"
          component={"i"}
          color="inherit"
          noWrap
        >
          87301-899 Campo Mourão - PR - Brasil
        </MuiMaterial.Typography>
      </MuiMaterial.Grid>
      <MuiMaterial.Grid item xs flexGrow={1}>
        <Copyright color={"HighlightText"} />
      </MuiMaterial.Grid>
      <MuiMaterial.Grid item xs={"auto"} color={"HighlightText"}>
        <MuiMaterial.Typography
          variant="h5"
          component={"strong"}
          color="inherit"
          noWrap
        >
          CONTATO
        </MuiMaterial.Typography>
        <br />
        <MuiMaterial.Typography
          variant="caption"
          component={"i"}
          color="inherit"
          noWrap
        >
          Redes Sociais
        </MuiMaterial.Typography>
        <br />
        <MuiMaterial.Typography variant="caption" color="inherit" noWrap>
          <MuiMaterial.IconButton color="inherit">
            <Instagram fontSize="small" />
          </MuiMaterial.IconButton>
          <MuiMaterial.IconButton color="inherit">
            <Facebook fontSize="small" />
          </MuiMaterial.IconButton>
          <MuiMaterial.IconButton color="inherit">
            <Twitter fontSize="small" />
          </MuiMaterial.IconButton>
        </MuiMaterial.Typography>
        <br />
        <MuiMaterial.Typography
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
        </MuiMaterial.Typography>
        <MuiMaterial.Typography
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
            <div>&nbsp; Email: info@example.com</div>
          </div>
        </MuiMaterial.Typography>
      </MuiMaterial.Grid>
    </MuiMaterial.Grid>
  );
}
