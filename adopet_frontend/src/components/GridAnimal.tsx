import * as MUI from "@mui/material";
import * as React from "react";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import PageNumber from "./elements/PageNumber";
import CardAnimal from "./elements/cards/CardAnimal";
import * as Router from "react-router-dom";

interface GridAnimalProps {
  page: number;
  totalPages: number;
  filteringActive: boolean;
  loading: boolean;
  messageError: string;
  animals: InterfaceAnimal[];
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function GridAnimal({
  page,
  totalPages,
  filteringActive,
  loading,
  messageError,
  animals,
  handlePageChange,
}: GridAnimalProps) {
  const navigate = Router.useNavigate();

  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (messageError !== "") {
    return (
      <MUI.Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        paddingTop={"15%"}
      >
        <MUI.Typography variant={"h3"}>
          <b>Houve um Erro: Os animais não puderam ser carregados.</b>
        </MUI.Typography>
      </MUI.Box>
    );
  }

  if (animals.length === 0 && filteringActive) {
    return (
      <MUI.Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        paddingTop={"15%"}
      >
        <MUI.Typography variant={"h3"}>
          <b>Não foram encontrados animais com estas características.</b>
        </MUI.Typography>
      </MUI.Box>
    );
  } else if (animals.length === 0 && !filteringActive) {
    return (
      <MUI.Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        paddingTop={"15%"}
      >
        <MUI.Typography variant={"h3"}>
          <b>Não há animais para adoção.</b>
        </MUI.Typography>
      </MUI.Box>
    );
  }

  return (
    <React.Fragment>
      <MUI.Grid container spacing={3} sx={{ t: "10px" }}>
        {animals.map((animal: InterfaceAnimal) => (
          <MUI.Grid item key={animal.id} xs={4}>
            <CardAnimal
              animal={animal}
              handleClick={() => {
                try {
                  navigate(`/animal/${animal.id}`);
                } catch (error) {
                  console.log("error");
                }
              }}
            />
          </MUI.Grid>
        ))}
      </MUI.Grid>
      <MUI.Box mt={2} width={"100%"}>
        <PageNumber
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </MUI.Box>
    </React.Fragment>
  );
}
