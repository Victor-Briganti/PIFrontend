
import * as React from "react";
import * as MUI from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRight from "./CopyRight";
{/*import AxiosUser from "./api/AxiosUser";*/}
import Main from "./container/Main";
import { useNavigate } from "react-router-dom";

// componente para avatar

function Avatar() {
    return (
      <MUI.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </MUI.Avatar>
    );
  }