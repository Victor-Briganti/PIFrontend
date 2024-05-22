import * as MUI from "@mui/material";
import * as React from "react";
import ModelAnimal from "../models/Animal";
import AxiosAnimal from "../api/AxiosAnimal";
import CardAnimal from "./elements/CardAnimal";
import Pagination from "./elements/Pagination";

const axiosAnimal = new AxiosAnimal();

export default function GridAnimal() {
  const [animals, setAnimals] = React.useState([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    axiosAnimal
      .listAnimals(value)
      .then((response) => {
        setAnimals(response.results);
        setPage(value);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    axiosAnimal
      .listAnimals()
      .then((response) => {
        setAnimals(response.results);
        setTotalPages(Math.ceil(response.count / 9));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!animals) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <React.Fragment>
      <MUI.Grid container spacing={3}>
        {animals.map((animal: ModelAnimal) => (
          <MUI.Grid item key={animal.id} xs={4}>
            <CardAnimal animal={animal} />
          </MUI.Grid>
        ))}
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </MUI.Grid>
    </React.Fragment>
  );
}
