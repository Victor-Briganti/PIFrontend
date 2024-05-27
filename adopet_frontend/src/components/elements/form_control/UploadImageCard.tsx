import * as MUI from "@mui/material";
import * as React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface UploadImageCardProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function UploadImageCard({
  handleChange,
}: UploadImageCardProps) {
  return (
    <React.Fragment>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="image-upload">
        <MUI.Box display="flex" flexDirection="column" alignItems="center">
          <MUI.IconButton
            color="primary"
            aria-label="Envie uma foto"
            component="span"
          >
            <CloudUploadIcon style={{ fontSize: 60 }} />
          </MUI.IconButton>
          <MUI.Typography>
            Clique ou arraste uma imagem para enviar
          </MUI.Typography>
        </MUI.Box>
      </label>
    </React.Fragment>
  );
}
