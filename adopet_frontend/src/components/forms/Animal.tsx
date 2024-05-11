import * as MUI from "@mui/material";
import * as React from "react";
import {
  MapAgeChoice,
  MapCoatChoice,
  MapGenderChoice,
  MapSizeChoice,
  MapSpecieChoice,
} from "../../models/map_choices/MapChoices";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MenuItem from "../elements/MenuItem";

interface FormAnimalProps {
  specie: string;
  handleSpecie: (event: MUI.SelectChangeEvent) => void;
  gender: string;
  handleGender: (event: MUI.SelectChangeEvent) => void;
  size: string;
  handleSize: (event: MUI.SelectChangeEvent) => void;
  coat: string;
  handleCoat: (event: MUI.SelectChangeEvent) => void;
  age: string;
  handleAge: (event: MUI.SelectChangeEvent) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormAnimal({
  specie,
  handleSpecie,
  gender,
  handleGender,
  size,
  handleSize,
  coat,
  handleCoat,
  age,
  handleAge,
  handleSubmit,
}: FormAnimalProps) {
  const mapAge = new MapAgeChoice();
  const mapCoat = new MapCoatChoice();
  const mapGender = new MapGenderChoice();
  const mapSize = new MapSizeChoice();
  const mapSpecie = new MapSpecieChoice();

  return (
    <React.Fragment>
      <MUI.Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <MUI.Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </MUI.Avatar>

        <MUI.Typography component="h1" variant="h5">
          Registro de Animais
        </MUI.Typography>

        <MUI.Grid container spacing={2}>
          <MUI.Grid item xs={12} sm={12}>
            <MUI.TextField
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
            />
          </MUI.Grid>

          <MUI.Grid item xs={12} sm={12}>
            <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
              <MUI.InputLabel id="genderInput">Genêro</MUI.InputLabel>
              <MUI.Select
                labelId="genderLabel"
                id="gender"
                value={gender}
                label="Gênero *"
                onChange={handleGender}
              >
                <MenuItem items={mapGender.getArray()} />
              </MUI.Select>
              <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
            </MUI.FormControl>
          </MUI.Grid>

          <MUI.Grid item xs={12} sm={12}>
            <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
              <MUI.InputLabel id="coatInput">Pelagem</MUI.InputLabel>
              <MUI.Select
                labelId="coatLabel"
                id="coat"
                value={coat}
                label="Pelagem"
                onChange={handleCoat}
              >
                <MenuItem items={mapCoat.getArray()} />
              </MUI.Select>
            </MUI.FormControl>
          </MUI.Grid>

          <MUI.Grid item xs={12} sm={12}>
            <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
              <MUI.InputLabel id="sizeInput">Tamanho</MUI.InputLabel>
              <MUI.Select
                labelId="sizeLabel"
                id="size"
                value={size}
                label="Tamanho *"
                onChange={handleSize}
              >
                <MenuItem items={mapSize.getArray()} />
              </MUI.Select>
              <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
            </MUI.FormControl>
          </MUI.Grid>

          <MUI.Grid item xs={12} sm={12}>
            <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
              <MUI.InputLabel id="ageInput">Idade</MUI.InputLabel>
              <MUI.Select
                labelId="ageLabel"
                id="age"
                value={age}
                label="Idade *"
                onChange={handleAge}
              >
                <MenuItem items={mapAge.getArray()} />
              </MUI.Select>
              <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
            </MUI.FormControl>
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Box>
    </React.Fragment>
  );
}
