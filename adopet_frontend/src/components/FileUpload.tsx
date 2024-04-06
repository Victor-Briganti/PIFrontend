import * as React from "react";
import * as MUI from "@mui/material";
import AxiosAnimal from "./api/AxiosAnimal";
import { ImageAnimal } from "./models/ImageAnimal";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Instância axios para acessar o usuário
const axiosAnimal = new AxiosAnimal();

export default function InputFileUpload() {
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const imageAnimal = new ImageAnimal({
          image: selectedFiles[i],
          animal: 1,
        });

        await axiosAnimal.sendImage(imageAnimal);
        console.log("Imagem enviada com sucesso", selectedFiles[i].name);
      }
    } catch (error) {
      console.log("Imagem não pode ser enviada:", selectedFiles[i].name);
      console.error(error);
    }
  };

  return (
    <form>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Select images
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
      </Button>
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload images
      </Button>
    </form>
  );
}
