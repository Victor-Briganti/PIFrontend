import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as MUI from "@mui/material";
import * as React from "react";
import AgeChoiceMap from "../../models/map_choices/AgeChoiceMap";
import CoatChoiceMap from "../../models/map_choices/CoatChoiceMap";
import GenderChoiceMap from "../../models/map_choices/GenderChoiceMap";
import SizeChoiceMap from "../../models/map_choices/SizeChoiceMap";
import SpecieChoiceMap from "../../models/map_choices/SpecieChoiceMap";
import ErrorAlert from "../elements/ErrorAlert";
import FormCheckBox from "../elements/form_control/FormCheckbox";
import FormControlField from "../elements/form_control/FormControlField";

interface FormAnimalUpdateProps {
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

export default function FormAnimalUpdate({
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
}: FormAnimalUpdateProps) {
  const specieMap = new SpecieChoiceMap();
  const genderMap = new GenderChoiceMap();
  const sizeMap = new SizeChoiceMap();
  const ageMap = new AgeChoiceMap();
  const coatMap = new CoatChoiceMap();

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
              <MUI.Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Atualizar
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
