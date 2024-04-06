import * as React from "react";
import * as MUI from "@mui/material";
import AxiosAnimal from "./api/AxiosAnimal";

// Instância axios para acessar o usuário
const axiosAnimal = new AxiosAnimal();

export default function RegisterUser() {
    return (
        <MUI.Container component="main" maxWidth="xs">
            <MUI.CssBaseline />
        </MUI.Container>
    );
}
