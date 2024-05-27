import ErrorLayout from "../components/layouts/ErrorLayout";
import * as MUI from "@mui/material";

export default function NotFound() {
  return (
    <ErrorLayout>
      <MUI.Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>404 NÃO ENCONTRADO</h1>
      </MUI.Box>
    </ErrorLayout>
  );
}
