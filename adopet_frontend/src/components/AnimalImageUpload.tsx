import * as React from "react";
import * as MUI from "@mui/material";
import Main from "./container/Main";
import Content from "./container/Content";
import DragBox from "./container/DragBox";
import ErrorAlert from "./elements/ErrorAlert";
import UploadImageCard from "./elements/UploadImageCard";
import CircularLoading from "./elements/CircularLoading";
import ModelAnimalImage from "../models/AnimalImage";
import ImageUploadPreview from "./elements/ImageUploadPreview";

interface AnimalImageUploadProps {
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleUploadStep: (images: ModelAnimalImage[]) => void;
}

export default function AnimalImageUpload({
  messageError,
  setMessageError,
  handleUploadStep,
}: AnimalImageUploadProps) {
  const [dragOver, setDragOver] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [animalImages, setAnimalImages] = React.useState<ModelAnimalImage[]>(
    []
  );
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  const handleFileChange = React.useCallback(
    (files: FileList) => {
      setLoading(true);
      const previews = [];
      const promises = [];
      const images = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        previews.push(URL.createObjectURL(file));
        images.push(file);

        promises.push(
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
              if (event.target) {
                const result = event.target.result as string;
                const image = new Image();
                image.src = result;
                image.onload = async () => {
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    const dataUrl = canvas.toDataURL("image/jpeg");
                    resolve(dataUrl);
                  }
                };
              }
            };
            reader.readAsDataURL(file);
          })
        );
      }

      Promise.all(promises)
        .then((results: string[]) => {
          setLoading(false);
          setImagePreviews((prevPreviews: string[]) => [
            ...(prevPreviews as string[]),
            ...(results as string[]),
          ]);
        })
        .catch((error) => {
          setLoading(false);
          setMessageError("Error ao ler a imagem:", error);
        });

      // Adiciona imagens que serão enviadas
      const newImages = images.map((file) => {
        return new ModelAnimalImage({ animal: 0, image: file });
      });
      setAnimalImages((prevImages) => [...prevImages, ...newImages]);
    },
    [setMessageError]
  );

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
    [setDragOver]
  );

  const handleDragLeave = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
    },
    [setDragOver]
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
      const files = event.dataTransfer.files;
      handleFileChange(files);
    },
    [handleFileChange]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files !== null) {
        handleFileChange(files);
      }
    },
    [handleFileChange]
  );

  const handleSubmit = () => {
    handleUploadStep(animalImages);
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
