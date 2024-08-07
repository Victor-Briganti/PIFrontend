import * as MUI from "@mui/material";
import * as React from "react";
import { InterfaceAnimalImageFile } from "../models/interfaces/animal/InterfaceAnimalImage";
import DragBox from "./modules/DragBox";
import CircularLoading from "./elements/CircularLoading";
import ErrorAlert from "./elements/ErrorAlert";
import ImageUploadPreview from "./elements/form_control/ImageUploadPreview";

interface UploadAnimalImageProps {
  messageError: string;
  animalName: string | undefined;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleUploadStep: (images: InterfaceAnimalImageFile[]) => void;
}

export default function UploadAnimalImage({
  messageError,
  animalName,
  setMessageError,
  handleUploadStep,
}: UploadAnimalImageProps) {
  const [dragOver, setDragOver] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [animalImages, setAnimalImages] = React.useState<
    InterfaceAnimalImageFile[]
  >([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  const handleFileChange = React.useCallback(
    (files: FileList) => {
      setMessageError("");
      setLoading(true);

      // Inicializa arrays para armazenar pŕevias, promessas e imagens
      const previews = [];
      const promises = [];
      const images = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Verifica se o arquivo é uma imagem(e é válido)
        if (!file.type.startsWith("image/")) {
          setMessageError("Um ou mais arquivos não são uma imagem válida.");
          setLoading(false);
          return;
        }

        if (file.type === "image/svg+xml") {
          setMessageError(".svg não é suportado como uma imagem.");
          setLoading(false);
          return;
        }

        // Adiciona URL da prévia do arquivo
        previews.push(URL.createObjectURL(file));
        // Adiciona o arquivo á lista de imagens
        images.push(file);

        // Cria uma promessa para carregar e converter a imagem para base64
        promises.push(
          new Promise<string>((resolve) => {
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
        return { animal: 0, image: file } as InterfaceAnimalImageFile;
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
    <React.Fragment>
      <MUI.Typography component="h1" variant="h5">
        Upload de Imagens do {animalName}
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

        <MUI.Button variant="contained" color="primary" onClick={handleSubmit}>
          Enviar
        </MUI.Button>

        <ImageUploadPreview
          imagePreviews={imagePreviews}
          handleRemoveImage={handleRemoveImage}
        />

        <ErrorAlert messageError={messageError} />
      </MUI.Box>
    </React.Fragment>
  );
}
