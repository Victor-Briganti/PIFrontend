import * as React from "react";
import * as Router from "react-router-dom";
import * as MUI from "@mui/material";
import GridRequestAnimal from "../components/GridRequestAnimal";
import PageLayout from "../components/layouts/PageLayout";
import UserContext from "../hooks/UserContext";

export default function AnimalRequestList() {
  const user = React.useContext(UserContext);

  if (user.context === null) {
    return (
      <React.Fragment>
        <h1>Faça login para acessar.</h1>
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
      </React.Fragment>
    );
  }

  return (
    <PageLayout bgcolor="secondary.light" color="primary.contrastText">
      <GridRequestAnimal />
    </PageLayout>
  );
}
