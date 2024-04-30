import * as React from "react";
import * as MUI from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRight from "./CopyRight";
{/*import AxiosUser from "./api/AxiosUser"; */}
import Main from "./container/Main";
import { useNavigate } from "react-router-dom";

// Componente para o campo de e-mail
function EmailField() {
  return (
    <MUI.TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Endereço de Email"
      name="email"
      autoComplete="email"
      autoFocus
    />
  );
}
export default EmailField;