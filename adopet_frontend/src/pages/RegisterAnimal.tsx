import * as React from "react";
import * as MUI from "@mui/material";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MenuItems from "../components/MenuItems";
import * as MapChoice from "../models/map_choices/MapChoices";

export default function RegisterAnimal() {
  const [specie, setSpecie] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("");
  const [size, setSize] = React.useState<string>("");
  const [age, setAge] = React.useState<string>("");
  const [coat, setCoat] = React.useState<string>("");

  const handleSpecie = (event: MUI.SelectChangeEvent) => {
    setSpecie(event.target.value);
  };

  const handleGender = (event: MUI.SelectChangeEvent) => {
    setGender(event.target.value);
  };

  const handleSize = (event: MUI.SelectChangeEvent) => {
    setSize(event.target.value);
  };

  const handleAge = (event: MUI.SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleCoat = (event: MUI.SelectChangeEvent) => {
    setCoat(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Teste");
  };

  const specieMap = new MapChoice.MapSpecieChoice();
  const genderMap = new MapChoice.MapGenderChoice();
  const sizeMap = new MapChoice.MapSizeChoice();
  const ageMap = new MapChoice.MapAgeChoice();
  const coatMap = new MapChoice.MapCoatChoice();

  return (
    <Main>
      <Content>
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
                />
              </MUI.Grid>

              <MUI.Grid item xs={12} sm={12}>
                <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
                  <MUI.InputLabel id="specieInput">Espécie</MUI.InputLabel>
                  <MenuItems
                    map={specieMap}
                    handleValue={handleSpecie}
                    label={"Espécie"}
                    value={specie}
                    name={"specie"}
                  />
                  <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
                </MUI.FormControl>
              </MUI.Grid>

              <MUI.Grid item xs={12} sm={12}>
                <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
                  <MUI.InputLabel id="genderInput">Genêro</MUI.InputLabel>
                  <MenuItems
                    map={genderMap}
                    handleValue={handleGender}
                    label={"Genêro"}
                    value={gender}
                    name={"gender"}
                  />
                  <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
                </MUI.FormControl>
              </MUI.Grid>

              <MUI.Grid item xs={12} sm={12}>
                <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
                  <MUI.InputLabel id="sizeInput">Tamanho</MUI.InputLabel>
                  <MenuItems
                    map={sizeMap}
                    handleValue={handleSize}
                    label={"Tamanho"}
                    value={size}
                    name={"size"}
                  />
                  <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
                </MUI.FormControl>
              </MUI.Grid>

              <MUI.Grid item xs={12} sm={12}>
                <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
                  <MUI.InputLabel id="ageInput">Idade</MUI.InputLabel>
                  <MenuItems
                    map={ageMap}
                    handleValue={handleAge}
                    label={"Idade"}
                    value={age}
                    name={"age"}
                  />
                  <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
                </MUI.FormControl>
              </MUI.Grid>

              <MUI.Grid item xs={12} sm={12}>
                <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
                  <MUI.InputLabel id="coatInput">Pelagem</MUI.InputLabel>
                  <MenuItems
                    map={coatMap}
                    handleValue={handleCoat}
                    label={"Pelagem"}
                    value={coat}
                    name={"coat"}
                  />
                  <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
                </MUI.FormControl>
              </MUI.Grid>

              <MUI.Grid item xs={12} sm={12}>
                <MUI.TextField
                  fullWidth
                  id="temperament"
                  label="Temperament"
                  name="temperament"
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
                />
              </MUI.Grid>

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
            </MUI.Grid>
          </MUI.Box>
        </MUI.Box>
      </Content>
    </Main>
  );
}
