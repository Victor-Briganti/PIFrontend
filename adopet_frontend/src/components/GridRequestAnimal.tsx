import * as MUI from "@mui/material";
import * as React from "react";
import AxiosDonor from "../api/AxiosDonor";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import PageNumber from "./elements/PageNumber";
import CardDonorAnimal from "./elements/cards/CardDonorAnimal";

export default function GridRequestAnimal() {
  const [messageError, setMessageError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [animals, setAnimals] = React.useState([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const axiosDonor = React.useMemo(() => new AxiosDonor(), []);

  React.useEffect(() => {
    axiosDonor
      .getRequestsAnimalList()
      .then((response) => {
        setAnimals(response.results);
        setTotalPages(Math.ceil(response.count / 9));
      })
      .catch((error) => {
        setMessageError(error);
      });

    setLoading(false);
  }, [axiosDonor]);

  const handlePageChange = React.useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setLoading(true);
      event.preventDefault();
      axiosDonor
        .getRequestsAnimalList(value)
        .then((response) => {
          setAnimals(response.results);
          setPage(value);
        })
        .catch((error) => {
          setMessageError(error);
        });
      setLoading(false);
    },
    [axiosDonor]
  );

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
      <MUI.Grid container spacing={3}>
        {animals.map((animal: InterfaceAnimal) => (
          <MUI.Grid item key={animal.id} xs={4}>
            <CardDonorAnimal animal={animal} />
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
