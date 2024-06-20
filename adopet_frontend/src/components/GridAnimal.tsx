import * as MUI from "@mui/material";
import * as React from "react";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import PageNumber from "./elements/PageNumber";
import CardAnimal from "./elements/cards/CardAnimal";

interface GridAnimalProps {
  page: number;
  totalPages: number;
  loading: boolean;
  messageError: string;
  animals: InterfaceAnimal[];
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function GridAnimal({
  page,
  totalPages,
  loading,
  messageError,
  animals,
  handlePageChange,
}: GridAnimalProps) {
  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (messageError !== "") {
    return (
      <div>
        <h1>O animal não pode ser carregado</h1>
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div>
        <h1>Não há animais para serem mostrados</h1>
      </div>
    );
  }

  return (
    <React.Fragment>
      <MUI.Grid container spacing={3} sx={{ t: "10px" }}>
        {animals.map((animal: InterfaceAnimal) => (
          <MUI.Grid item key={animal.id} xs={4}>
            <CardAnimal animal={animal} />
          </MUI.Grid>
        ))}
      </MUI.Grid>
      <MUI.Box mt={2}>
        <PageNumber
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </MUI.Box>
    </React.Fragment>
  );
}
