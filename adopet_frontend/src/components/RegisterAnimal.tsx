import * as React from "react";
import * as MuiMaterial from "@mui/material";
import AxiosAnimal from "./api/AxiosAnimal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Animal } from "./models/Animal";
import { AnimalFormChoice } from "./models/AnimalFormChoice";

// Instância axios para acessar o usuário
const axiosAnimal = new AxiosAnimal();

export default function RegisterAnimal() {
  const [choices, setChoices] = React.useState<AnimalFormChoice | null>(null);
  const [loadError, setLoadError] = React.useState<string>("");
  const [messageError, setMessageError] = React.useState<string>("");

  // Estados para escolhas do formulário
  const [specie, setSpecie] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("");
  const [size, setSize] = React.useState<string>("");
  const [isHouseTrained, setHouseTrained] = React.useState<boolean>(false);
  const [isSpecialNeeds, setSpecialNeeds] = React.useState<boolean>(false);

  const handleSpecie = (event: MuiMaterial.SelectChangeEvent) => {
    setSpecie(event.target.value);
  };

  const handleGender = (event: MuiMaterial.SelectChangeEvent) => {
    setGender(event.target.value);
  };

  const handleSize = (event: MuiMaterial.SelectChangeEvent) => {
    setSize(event.target.value);
  };

  const handleHouseTrained = (event: React.ChangeEvent) => {
    setHouseTrained(event.target.checked);
  };

  const handleSpecialNeeds = (event: React.ChangeEvent) => {
    setSpecialNeeds(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Intercepta a submissão do formulário pelo navegador
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("size", size);
    formData.append("gender", gender);
    formData.append("specie", specie);
    formData.append("is_special_needs", isSpecialNeeds.toString());
    formData.append("is_house_trained", isHouseTrained.toString());
    const animal = new Animal(null);
    try {
      animal.saveFormData(formData);
    } catch (error: any) {
      setMessageError(error.message);
      return;
    }
    axiosAnimal.registerAnimal(animal).catch((error) => {
      setMessageError("Erro ao carregar ao salvar o animal. Tente novamente.");
    });
  };

  // Quando o componente é montado, faz uma requisição GET para a API
  React.useEffect(() => {
    axiosAnimal
      .getChoices()
      .then((data: AnimalFormChoice) => {
        setChoices(new AnimalFormChoice(data));
      })
      .catch((error) => {
        setLoadError(
          "Erro ao carregar as opções de formulário. Tente novamente."
        );
      });
  }, []);

  // Se as opções ainda não foram carregadas, exibe uma mensagem de carregamento
  if (!choices && loadError !== "") {
    return (
      <div>
        <h1>{loadError}</h1>
      </div>
    );
  } else if (!choices) {
    return <div>Carregando...</div>;
  }

  return (
    <MuiMaterial.Container component="main" maxWidth="xs">
      <MuiMaterial.CssBaseline />
      <MuiMaterial.Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MuiMaterial.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </MuiMaterial.Avatar>
        <MuiMaterial.Typography component="h1" variant="h5">
          Registro de Animais
        </MuiMaterial.Typography>
        <MuiMaterial.Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <MuiMaterial.Grid container spacing={2}>
            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.TextField
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
              />
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.TextField
                required
                fullWidth
                id="age"
                label="Idade"
                name="age"
              />
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.TextField
                required
                fullWidth
                id="weight"
                label="Peso"
                name="weight"
              />
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.TextField
                required
                fullWidth
                id="coat"
                label="Pelagem"
                name="coat"
              />
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.FormControl sx={{ m: 1, minWidth: 400 }}>
                <MuiMaterial.InputLabel id="specieInput">
                  Espécie
                </MuiMaterial.InputLabel>
                <MuiMaterial.Select
                  labelId="specieLabel"
                  id="specie"
                  value={specie}
                  label="Espécie *"
                  onChange={handleSpecie}
                >
                  {choices.mapSpecies()}
                </MuiMaterial.Select>
                <MuiMaterial.FormHelperText>
                  Campo Obrigatório
                </MuiMaterial.FormHelperText>
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.FormControl sx={{ m: 1, minWidth: 400 }}>
                <MuiMaterial.InputLabel id="genderInput">
                  Sexo
                </MuiMaterial.InputLabel>
                <MuiMaterial.Select
                  labelId="genderLabel"
                  id="gender"
                  value={gender}
                  label="Espécie *"
                  onChange={handleGender}
                >
                  {choices.mapGender()}
                </MuiMaterial.Select>
                <MuiMaterial.FormHelperText>
                  Campo Obrigatório
                </MuiMaterial.FormHelperText>
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.FormControl sx={{ m: 1, minWidth: 400 }}>
                <MuiMaterial.InputLabel id="sizeInput">
                  Tamanho
                </MuiMaterial.InputLabel>
                <MuiMaterial.Select
                  labelId="sizeLabel"
                  id="size"
                  value={size}
                  label="Tamanho *"
                  onChange={handleSize}
                >
                  {choices.mapSize()}
                </MuiMaterial.Select>
                <MuiMaterial.FormHelperText>
                  Campo Obrigatório
                </MuiMaterial.FormHelperText>
              </MuiMaterial.FormControl>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.TextField
                required
                fullWidth
                id="description"
                label="Descrição"
                name="description"
                multiline
                rows={5}
              />
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.FormGroup>
                <MuiMaterial.Grid item xs={12} sm={12}>
                  <MuiMaterial.FormControlLabel
                    control={
                      <MuiMaterial.Checkbox
                        id="is_house_trained"
                        checked={isHouseTrained}
                        onChange={handleHouseTrained}
                      />
                    }
                    label="Sabe usar a caixa de areia ou o tapete higiênico"
                  />
                </MuiMaterial.Grid>

                <MuiMaterial.Grid item xs={12} sm={12}>
                  <MuiMaterial.FormControlLabel
                    control={
                      <MuiMaterial.Checkbox
                        id="is_special_needs"
                        checked={isSpecialNeeds}
                        onChange={handleSpecialNeeds}
                      />
                    }
                    label="Possui necessidades especiais"
                  />
                </MuiMaterial.Grid>
              </MuiMaterial.FormGroup>
            </MuiMaterial.Grid>

            <MuiMaterial.Grid item xs={12} sm={12}>
              <MuiMaterial.Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </MuiMaterial.Button>
            </MuiMaterial.Grid>
            {messageError && (
              <MuiMaterial.Grid item xs={12} sm={12}>
                <MuiMaterial.Alert variant="filled" severity="error">
                  {messageError}
                </MuiMaterial.Alert>
              </MuiMaterial.Grid>
            )}
          </MuiMaterial.Grid>
        </MuiMaterial.Box>
      </MuiMaterial.Box>
    </MuiMaterial.Container>
  );
}
