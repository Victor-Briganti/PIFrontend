import * as React from "react";
import * as MUI from "@mui/material";
import AxiosAnimal from "./api/AxiosAnimal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Animal } from "./models/Animal";
import { AnimalFormChoice } from "./models/AnimalFormChoice";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleSpecie = (event: MUI.SelectChangeEvent) => {
    setSpecie(event.target.value);
  };

  const handleGender = (event: MUI.SelectChangeEvent) => {
    setGender(event.target.value);
  };

  const handleSize = (event: MUI.SelectChangeEvent) => {
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
    const response = await axiosAnimal.registerAnimal(animal).catch((error) => {
      setMessageError("Erro ao carregar ao salvar o animal. Tente novamente.");
    });

    try {
      navigate("/animalupload", {
        state: { animalName: response.name, animalId: response.id },
      });
    } catch (error) {
      setMessageError(
        "Não foi possível redirecionar para a página de upload de imagens."
      );
      console.log(error);
    }
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
    <MUI.Container component="main" maxWidth="xs">
      <MUI.CssBaseline />
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
              <MUI.TextField
                required
                fullWidth
                id="age"
                label="Idade"
                name="age"
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="weight"
                label="Peso"
                name="weight"
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="coat"
                label="Pelagem"
                name="coat"
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
                <MUI.InputLabel id="specieInput">Espécie</MUI.InputLabel>
                <MUI.Select
                  labelId="specieLabel"
                  id="specie"
                  value={specie}
                  label="Espécie *"
                  onChange={handleSpecie}
                >
                  {choices.mapSpecies()}
                </MUI.Select>
                <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
              </MUI.FormControl>
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
                <MUI.InputLabel id="genderInput">Sexo</MUI.InputLabel>
                <MUI.Select
                  labelId="genderLabel"
                  id="gender"
                  value={gender}
                  label="Espécie *"
                  onChange={handleGender}
                >
                  {choices.mapGender()}
                </MUI.Select>
                <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
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
                  {choices.mapSize()}
                </MUI.Select>
                <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
              </MUI.FormControl>
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="description"
                label="Descrição"
                name="description"
                multiline
                rows={5}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.FormGroup>
                <MUI.Grid item xs={12} sm={12}>
                  <MUI.FormControlLabel
                    control={
                      <MUI.Checkbox
                        id="is_house_trained"
                        checked={isHouseTrained}
                        onChange={handleHouseTrained}
                      />
                    }
                    label="Sabe usar a caixa de areia ou o tapete higiênico"
                  />
                </MUI.Grid>

                <MUI.Grid item xs={12} sm={12}>
                  <MUI.FormControlLabel
                    control={
                      <MUI.Checkbox
                        id="is_special_needs"
                        checked={isSpecialNeeds}
                        onChange={handleSpecialNeeds}
                      />
                    }
                    label="Possui necessidades especiais"
                  />
                </MUI.Grid>
              </MUI.FormGroup>
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
            {messageError && (
              <MUI.Grid item xs={12} sm={12}>
                <MUI.Alert variant="filled" severity="error">
                  {messageError}
                </MUI.Alert>
              </MUI.Grid>
            )}
          </MUI.Grid>
        </MUI.Box>
      </MUI.Box>
    </MUI.Container>
  );
}
