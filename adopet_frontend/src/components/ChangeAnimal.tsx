import * as React from "react";
import * as MUI from "@mui/material";
import AxiosAnimal from "./api/AxiosAnimal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Animal } from "./models/Animal";
import { AnimalFormChoice } from "./models/AnimalFormChoice";
import { useNavigate, useLocation } from "react-router-dom";

// Instância axios para acessar o usuário
const axiosAnimal = new AxiosAnimal();

export default function ChangeAnimal() {
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
  const location = useLocation();

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

    console.log(animal);

    try {
      animal.saveFormData(formData);
      animal.validateRegister();
    } catch (error: any) {
      setMessageError(error.message);
      return;
    }

    animal.id = location.state.animal.id;

    const response = await axiosAnimal
      .updateAnimal(animal)
      .then(() => navigate("/animals"))
      .catch((error) => {
        setMessageError(
          "Erro ao carregar ao salvar o animal. Tente novamente."
        );
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

    if (location.state) {
      setHouseTrained(location.state.animal.is_house_trained);
      setSpecialNeeds(location.state.animal.is_special_needs);
      setSize(location.state.animal.size);
      setSpecie(location.state.animal.specie);
      setGender(location.state.animal.gender);
    }
  }, []);

  // Se as opções ainda não foram carregadas, exibe uma mensagem de carregamento
  if (!choices && loadError !== "") {
    return (
      <div>
        <h1>{loadError}</h1>
      </div>
    );
  } else if (!location.state) {
    return (
      <div>
        <h1>Não foi possível carregar informações do animal</h1>
      </div>
    );
  } else if (!choices) {
    return <div>Carregando...</div>;
  }

  console.log(location.state.animal);

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
          Alterar {location.state.animal.name}
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
                defaultValue={location.state.animal.name}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="age"
                label="Idade"
                name="age"
                defaultValue={location.state.animal.age}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                fullWidth
                id="weight"
                label="Peso"
                name="weight"
                defaultValue={location.state.animal.weight}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                fullWidth
                id="coat"
                label="Pelagem"
                name="coat"
                defaultValue={location.state.animal.coat}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
                <MUI.InputLabel id="specieInput">Espécie</MUI.InputLabel>
                <MUI.Select
                  labelId="specieLabel"
                  id="specie"
                  label="Espécie *"
                  onChange={handleSpecie}
                  value={specie}
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
                  label="Espécie *"
                  onChange={handleGender}
                  value={gender}
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
                  label="Tamanho *"
                  onChange={handleSize}
                  value={size}
                >
                  {choices.mapSize()}
                </MUI.Select>
                <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
              </MUI.FormControl>
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                fullWidth
                id="description"
                label="Descrição"
                name="description"
                multiline
                rows={5}
                defaultValue={location.state.animal.description}
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
                        defaultValue={location.state.animal.is_house_trained}
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
                        defaultValue={location.state.animal.is_special_needs}
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
                Alterar
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
