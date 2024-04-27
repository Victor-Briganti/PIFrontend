import * as React from "react";
import * as MUI from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRight from "./CopyRight";
{/*import AxiosUser from "./api/AxiosUser"; */}
import Main from "./container/Main"; 
import { useNavigate } from "react-router-dom";


function PasswordField() {
    return (
      <MUI.TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
      />
    );
  }