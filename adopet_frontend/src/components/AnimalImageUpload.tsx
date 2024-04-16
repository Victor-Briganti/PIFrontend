import * as React from "react";
import { useLocation } from "react-router-dom";
import * as MUI from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { HighlightOffRounded } from "@mui/icons-material";
import { ImageAnimal } from "./models/ImageAnimal";
import AxiosAnimal from "./api/AxiosAnimal";
import { useNavigate } from "react-router-dom";

// Intância axios para acessar o usuário
const axiosAnimal = new AxiosAnimal();

export default function FileUpload() {
  const [dragOver, setDragOver] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [animalImages, setAnimalImages] = React.useState<ImageAnimal[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDragOver = React.useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = React.useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = React.useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    handleFileChange(files);
  }, []);

  const handleFileChange = (files) => {
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
        console.error("Error ao ler a imagem:", error);
      });

    // Adiciona imagens que serão enviadas
    const newImages = images.map((file) => {
      return { animal: location.state.animalId, image: file } as ImageAnimal;
    });
    setAnimalImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleChange = React.useCallback((event) => {
    const file = event.target.files;
    handleFileChange(file);
  }, []);

  const handleRemoveImage = (index) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );

    setAnimalImages((prevAnimal) => prevAnimal.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    for (let i = 0; i < animalImages.length; i++) {
      const image = animalImages[i];
      axiosAnimal.uploadImage(image).catch((error) => {
        console.error("Erro ao enviar a imagem:", error);
      });
      navigate("/");
    }
  };

  if (!location.state) {
    return (
      <div>
        <h1>Não foi possível carregar informações do animal</h1>
      </div>
    );
  }

  return (
    <MUI.Container component="main" maxWidth="xs">
      <MUI.CssBaseline />
      <MUI.Box>
        <MUI.Typography component="h1" variant="h5">
          Upload de Imagens do {location.state.animalName}
        </MUI.Typography>
        <MUI.Box sx={{ mt: 3 }}>
          <MUI.Paper
            variant="outlined"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: dragOver ? "2px dashed #000" : "2px dashed #ccc",
              padding: 20,
              textAlign: "center",
              cursor: "pointer",
              background: dragOver ? "#f0f0f0" : "#fff",
              position: "relative",
            }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              multiple
              type="file"
              onChange={handleChange}
            />
            <label htmlFor="image-upload">
              <MUI.Box
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
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
            {loading && (
              <MUI.CircularProgress
                size={24}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
            <MUI.Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Enviar
            </MUI.Button>
          </MUI.Paper>
          {imagePreviews.length > 0 && (
            <MUI.Grid
              container
              justifyContent="center"
              style={{ marginTop: 16 }}
            >
              {imagePreviews.map((preview, index) => (
                <MUI.Grid item xs={12} sm={6} md={4} key={index}>
                  <MUI.Box sx={{ position: "relative" }}>
                    <MUI.IconButton
                      style={{ position: "absolute", top: 0, right: 0 }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <HighlightOffRounded />
                    </MUI.IconButton>
                    <MUI.Box
                      component="img"
                      src={preview}
                      alt={`Image Preview ${index}`}
                      sx={{ width: "50%", height: "auto", maxHeight: 200 }}
                    />
                  </MUI.Box>
                </MUI.Grid>
              ))}
            </MUI.Grid>
          )}
        </MUI.Box>
      </MUI.Box>
    </MUI.Container>
  );
}
