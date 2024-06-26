import * as MUI from "@mui/material";
import * as Router from "react-router-dom";
import ErrorLayout from "../layouts/ErrorLayout";

export default function GlobalError() {
  return (
    <ErrorLayout>
      <MUI.Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <h1>Houve algum erro.</h1>
        <MUI.Box sx={{ mt: 2 }}>
          <MUI.Link
            component={Router.Link}
            to={"/"}
            variant="body2"
            fontSize={20}
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Voltar para home
          </MUI.Link>
        </MUI.Box>
      </MUI.Box>
    </ErrorLayout>
  );
}
