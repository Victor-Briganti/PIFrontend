import * as MUI from "@mui/material";
import InterfaceAnimal from "../../models/Animal";

interface InfoAnimalProps {
  animal: InterfaceAnimal;
}

export default function InfoAnimal({ animal }: InfoAnimalProps) {
  return (
    <MUI.Box>
      <MUI.Typography variant="h4">{animal.name}</MUI.Typography>
      <MUI.Grid container justifyContent={"flex-start"}>
        <MUI.Grid item xs={6}>
          <MUI.Typography variant="h5">Características</MUI.Typography>

          <MUI.Box component={"ul"} textAlign={"start"} sx={{ pl: 16 }}>
            <MUI.Typography>Idade: {animal.age}</MUI.Typography>
            <MUI.Typography>Espécie: {animal.specie}</MUI.Typography>
            <MUI.Typography>Genêro: {animal.gender}</MUI.Typography>
            <MUI.Typography>Tamanho: {animal.size}</MUI.Typography>
            <MUI.Typography>Pelagem: {animal.coat}</MUI.Typography>
            <MUI.Typography>Peso: {animal.weight?.toString()}</MUI.Typography>
            <MUI.Typography>
              Treinado: {animal.is_house_trained ? "Sim" : "Não"}
            </MUI.Typography>
            <MUI.Typography>
              Precisa de cuidados Especiais:{" "}
              {animal.is_special_needs ? "Sim" : "Não"}
            </MUI.Typography>
            <MUI.Typography>
              Castrado: {animal.is_castrated ? "Sim" : "Não"}
            </MUI.Typography>
            <MUI.Typography>
              Vacinado: {animal.is_vaccinated ? "Sim" : "Não"}
            </MUI.Typography>
          </MUI.Box>
        </MUI.Grid>
        <MUI.Grid item xs={6}>
          <MUI.Typography variant="h5">Sobre</MUI.Typography>
          {animal.description && animal.description.length > 60 ? (
            <MUI.Box textAlign={"center"} sx={{ px: 4 }}>
              <MUI.Typography>{animal.description}</MUI.Typography>
            </MUI.Box>
          ) : (
            <MUI.Box textAlign={"center"}>
              <MUI.Typography>{animal.description}</MUI.Typography>
            </MUI.Box>
          )}
        </MUI.Grid>
      </MUI.Grid>
    </MUI.Box>
  );
}
