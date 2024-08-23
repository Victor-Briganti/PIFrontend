import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as MUI from "@mui/material";
import * as React from "react";
import { InterfaceAnimalImageFile } from "../../models/interfaces/animal/InterfaceAnimalImage";
import AgeChoiceMap from "../../models/map_choices/AgeChoiceMap";
import CoatChoiceMap from "../../models/map_choices/CoatChoiceMap";
import GenderChoiceMap from "../../models/map_choices/GenderChoiceMap";
import SizeChoiceMap from "../../models/map_choices/SizeChoiceMap";
import SpecieChoiceMap from "../../models/map_choices/SpecieChoiceMap";
import CircularLoading from "../elements/CircularLoading";
import ErrorAlert from "../elements/ErrorAlert";
import FormCheckBox from "../elements/form_control/FormCheckbox";
import FormControlField from "../elements/form_control/FormControlField";
import ImageUploadPreview from "../elements/form_control/ImageUploadPreview";
import DragBox from "../modules/DragBox";
import CropperModal from "../elements/CropperModal";

interface FormAnimalProps {
  name: string;
  weight: number | undefined;
  age: string;
  coat: string;
  gender: string;
  size: string;
  specie: string;
  description: string;
  temperament: string;
  isHouseTrained: boolean;
  isSpecialNeeds: boolean;
  isVaccinated: boolean;
  isCastrated: boolean;
  handleImages: (
    imageUpdate: (
      prevImages: InterfaceAnimalImageFile[]
    ) => InterfaceAnimalImageFile[]
  ) => void;
  handleName: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleWeight: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleAge: (event: MUI.SelectChangeEvent) => void;
  handleCoat: (event: MUI.SelectChangeEvent) => void;
  handleGender: (event: MUI.SelectChangeEvent) => void;
  handleSize: (event: MUI.SelectChangeEvent) => void;
  handleSpecie: (event: MUI.SelectChangeEvent) => void;
  handleDescription: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleTemperament: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleHouseTrained: (event: React.ChangeEvent<Element>) => void;
  handleSpecialNeeds: (event: React.ChangeEvent<Element>) => void;
  handleVaccinated: (event: React.ChangeEvent<Element>) => void;
  handleCastrated: (event: React.ChangeEvent<Element>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  messageError: string;
}

export default function FormAnimal({
  name,
  weight,
  age,
  coat,
  gender,
  size,
  specie,
  description,
  temperament,
  isHouseTrained,
  isSpecialNeeds,
  isVaccinated,
  isCastrated,
  handleImages,
  handleName,
  handleWeight,
  handleAge,
  handleCoat,
  handleGender,
  handleSize,
  handleSpecie,
  handleDescription,
  handleTemperament,
  handleHouseTrained,
  handleSpecialNeeds,
  handleVaccinated,
  handleCastrated,
  handleSubmit,
  messageError,
}: FormAnimalProps) {
  const specieMap = new SpecieChoiceMap();
  const genderMap = new GenderChoiceMap();
  const sizeMap = new SizeChoiceMap();
  const ageMap = new AgeChoiceMap();
  const coatMap = new CoatChoiceMap();
  const [dragOver, setDragOver] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [openCropper, setOpenCropper] = React.useState<boolean>(false);
  const [currentImage, setCurrentImage] = React.useState<string | null>(null);

  const handleCropperClose = () => {
    setOpenCropper(false);
    setCurrentImage(null);
  };

  const handleCropperComplete = (preview: string, imageBlob: Blob) => {
    // Não há problema em deixar o nome genérico, o próprio backend se encarrega de não gerar duplicatas.
    const file = new File([imageBlob], "animal.jpeg", { type: "image/jpeg" });

    // Adiciona imagens que serão enviadas
    const newImages = { animal: 0, image: file } as InterfaceAnimalImageFile;
    handleImages(
      (prevImages: InterfaceAnimalImageFile[]) =>
        [...prevImages, newImages] as InterfaceAnimalImageFile[]
    );

    setImagePreviews((prevPreviews) => [...prevPreviews, preview]);

    setOpenCropper(false);
    setCurrentImage(null);
  };

  const openCropperModal = (image: string) => {
    setCurrentImage(image);
    setOpenCropper(true);
  };

  const handleFileChange = React.useCallback(
    async (files: FileList) => {
      messageError = "";
      setLoading(true);

      // Inicializa arrays para armazenar prévias e imagens
      const previewUrls: string[] = [];
      const imageFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Verifica se o arquivo é uma imagem(e é válido)
        if (!file.type.startsWith("image/")) {
          messageError = "Um ou mais arquivos não são uma imagem válida.";
          setLoading(false);
          return;
        }

        if (file.type === "image/svg+xml") {
          messageError = ".svg não é suportado como uma imagem.";
          setLoading(false);
          return;
        }

        previewUrls.push(URL.createObjectURL(file));
        imageFiles.push(file);
      }

      setLoading(false);

      // Abre o modal conforme a fila de imagens
      if (previewUrls.length > 0) {
        setCurrentImage(previewUrls[0]);
        openCropperModal(previewUrls[0]);
      }
    },
    [messageError]
  );

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );

    handleImages((prevAnimal) => prevAnimal.filter((_, i) => i !== index));
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

  return (
    <React.Fragment>
      <MUI.Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MUI.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </MUI.Avatar>

        <MUI.Typography component="h1" variant="h5">
          Registro de Animais
        </MUI.Typography>

        <MUI.Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <MUI.Grid container spacing={2}>
            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
                value={name}
                onChange={handleName}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="weight"
                label="Peso"
                name="weight"
                value={weight ?? ""}
                inputProps={{ min: "0" }}
                onChange={handleWeight}
              />
            </MUI.Grid>

            <FormControlField
              id={"Espécie"}
              label={"Espécie"}
              name={"specie"}
              value={specie}
              handleValue={handleSpecie}
              map={specieMap}
            />

            <FormControlField
              id={"Genêro"}
              label={"Genêro"}
              name={"gender"}
              value={gender}
              handleValue={handleGender}
              map={genderMap}
            />

            <FormControlField
              id={"Idade"}
              label={"Idade"}
              name={"age"}
              value={age}
              handleValue={handleAge}
              map={ageMap}
            />

            <FormControlField
              id={"Pelagem"}
              label={"Pelagem"}
              name={"coat"}
              value={coat}
              handleValue={handleCoat}
              map={coatMap}
            />

            <FormControlField
              id={"Tamanho"}
              label={"Tamanho"}
              name={"size"}
              value={size}
              handleValue={handleSize}
              map={sizeMap}
            />

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                fullWidth
                id="temperament"
                label="Temperamento"
                name="temperament"
                value={temperament}
                onChange={handleTemperament}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                fullWidth
                id="description"
                label="Descrição"
                name="description"
                multiline
                rows={5}
                value={description}
                onChange={handleDescription}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.FormGroup>
                <FormCheckBox
                  id={"is_house_trained"}
                  checked={isHouseTrained}
                  onChange={handleHouseTrained}
                  label={"Sabe usar a caixa de areia ou tapete higiênico"}
                />

                <FormCheckBox
                  id={"is_special_needs"}
                  checked={isSpecialNeeds}
                  onChange={handleSpecialNeeds}
                  label={"Possui necessidades especiais"}
                />

                <FormCheckBox
                  id={"is_vaccinated"}
                  checked={isVaccinated}
                  onChange={handleVaccinated}
                  label={"Vacinado"}
                />

                <FormCheckBox
                  id={"is_castrated"}
                  checked={isCastrated}
                  onChange={handleCastrated}
                  label={"Castrado"}
                />
              </MUI.FormGroup>
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <DragBox
                dragOver={dragOver}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleChange={handleChange}
              />

              <CircularLoading loading={loading} />

              <ImageUploadPreview
                imagePreviews={imagePreviews}
                handleRemoveImage={handleRemoveImage}
              />
            </MUI.Grid>

            {/* Cropper Modal */}
            {currentImage && (
              <CropperModal
                open={openCropper}
                onClose={handleCropperClose}
                image={currentImage}
                onCropCompleteCallback={handleCropperComplete}
              />
            )}

            <MUI.Grid item xs={12} sm={12}>
              <MUI.Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </MUI.Button>
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <ErrorAlert messageError={messageError} />
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Box>
      </MUI.Box>
    </React.Fragment>
  );
}
