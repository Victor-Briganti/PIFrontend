import * as MUI from "@mui/material";
import * as React from "react";
import ModelAnimalImage from "../models/AnimalImage";
import DragBox from "./section/DragBox";
import Content from "./container/Content";
import Main from "./container/Main";
import CircularLoading from "./elements/CircularLoading";
import ErrorAlert from "./elements/ErrorAlert";
import ImageUploadPreview from "./elements/ImageUploadPreview";

interface UploadAnimalImageProps {
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleUploadStep: (images: ModelAnimalImage[]) => void;
}

export default function UploadAnimalImage({
  messageError,
  setMessageError,
  handleUploadStep,
}: UploadAnimalImageProps) {
  const [dragOver, setDragOver] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [animalImages, setAnimalImages] = React.useState<ModelAnimalImage[]>(
    []
  );
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  const handleFileChange = React.useCallback(
    (files: FileList) => {
      setLoading(true);

      // Inicializa arrays para armazenar pŕevias, promessas e imagens
      const previews = [];
      const promises = [];
      const images = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Adiciona URL da prévia do arquivo
        previews.push(URL.createObjectURL(file));
        // Adiciona o arquivo á lista de imagens
        images.push(file);

        // Cria uma promessa para carregar e converter a imagem para base64
        promises.push(
          new Promise<string>((resolve, reject) => {
            // Cria um novo leitor de arquivos
            const reader = new FileReader();
            reader.onload = async (event) => {
              if (event.target) {
                // Obtém o resultado como uma string
                const result = event.target.result as string;
                const image = new Image();
                // Define a fonte da imagem como a URL dos dados de arquivo
                image.src = result;
                // Define o que fazer quando a imagem terminar de carregar
                image.onload = async () => {
                  // Usa o canvas para desenhar a imagem
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    // Obtém a imagem desenhada como uma imagem JPEG
                    const dataUrl = canvas.toDataURL("image/jpeg");
                    // Resolve a promessa com a URL dos dados da imagem
                    resolve(dataUrl);
                  }
                };
              }
            };
            // Inicia a leitura do arquivo como uma URL de dados
            reader.readAsDataURL(file);
          })
        );
      }

      // Executa todas as promessas em paraleleo
      Promise.all(promises)
        .then((results: string[]) => {
          setLoading(false);
          // Atualiza as prévias de imagem com os resultados obtidos
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
            handleChange={handleChange}
          />

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
