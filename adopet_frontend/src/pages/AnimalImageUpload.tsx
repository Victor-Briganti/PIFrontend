import * as React from "react";
import * as MUI from "@mui/material";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import DragBox from "../components/container/DragBox";
import ErrorAlert from "../components/elements/ErrorAlert";
import UploadImageCard from "../components/elements/UploadImageCard";
import CircularLoading from "../components/elements/CircularLoading";
import ModelAnimalImage from "../models/AnimalImage";
import ImageUploadPreview from "../components/elements/ImageUploadPreview";

interface AnimalImageUploadProps {
  handleUploadStep: () => void;
}

export default function AnimalImageUpload({
  handleUploadStep,
}: AnimalImageUploadProps) {
  const [dragOver, setDragOver] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [messageError, setMessageError] = React.useState<string>("");
  const [animalImages, setAnimalImages] = React.useState<ModelAnimalImage[]>(
    []
  );
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  const handleFileChange = (files: FileList) => {
    setLoading(true);
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      promises.push(
        new Promise<string>((resolve, _reject) => {
          // Simplesmente resolve a promessa com o arquivo como URL
          resolve(URL.createObjectURL(file));
        })
      );
    }

    Promise.all(promises)
      .then((results) => {
        setLoading(false);
        // Adiciona os resultados (URLs dos arquivos) ao estado das pré-visualizações das imagens
        setImagePreviews((prevPreviews) => [...prevPreviews, ...results]);
      })
      .catch((error) => {
        setLoading(false);
        setMessageError("Erro ao ler a imagem: " + error);
      });
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );

    setAnimalImages((prevAnimal) => prevAnimal.filter((_, i) => i !== index));
  };

  const handleDragOver = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(true);
    },
    []
  );

  const handleDragLeave = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
    },
    []
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
      const files = event.dataTransfer.files;
      handleFileChange(files);
    },
    []
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files !== null) {
        handleFileChange(files);
      }
    },
    []
  );

  const handleSubmit = () => {
    console.log("Enviado");
  };

  return (
    <Main>
      <Content>
        <MUI.Typography component="h1" variant="h5">
          Upload de Imagens do Placeholder
        </MUI.Typography>
        <MUI.Box sx={{ mt: 3 }}>
          <DragBox
            dragOver={dragOver}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
          >
            <UploadImageCard handleChange={handleChange} />
          </DragBox>
          <CircularLoading loading={loading} />
          <MUI.Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Enviar
          </MUI.Button>
          <MUI.Button
            variant="contained"
            color="primary"
            onClick={handleUploadStep}
          >
            Voltar
          </MUI.Button>
          <ImageUploadPreview
            imagePreviews={imagePreviews}
            handleRemoveImage={handleRemoveImage}
          />
          <ErrorAlert messageError={messageError} />
        </MUI.Box>
      </Content>
    </Main>
  );
}
