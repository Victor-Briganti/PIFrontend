import * as MUI from "@mui/material";
import * as React from "react";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import AxiosAnimal from "../api/AxiosAnimal";
import CardAnimal from "./elements/cards/CardAnimal";
import PageNumber from "./elements/PageNumber";

export default function GridAnimal() {
  const [animals, setAnimals] = React.useState([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const axiosAnimal = React.useMemo(() => new AxiosAnimal(), []);

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
  }, [axiosAnimal]);

  const handlePageChange = React.useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      event.preventDefault();
      axiosAnimal
        .listAnimals(value)
        .then((response) => {
          setAnimals(response.results);
          setPage(value);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [axiosAnimal]
  );

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
        {animals.map((animal: InterfaceAnimal) => (
          <MUI.Grid item key={animal.id} xs={4}>
            <CardAnimal animal={animal} />
          </MUI.Grid>
        ))}
        <PageNumber
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </MUI.Grid>
    </React.Fragment>
  );
}
