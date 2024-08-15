import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosAnimal from "../api/AxiosAnimal";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import PageNumber from "./elements/PageNumber";
import CardAnimal from "./elements/cards/CardAnimal";

export default function GridDonorAnimal() {
  const [messageError, setMessageError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [animals, setAnimals] = React.useState([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const axiosAnimal = React.useMemo(() => new AxiosAnimal(), []);
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    axiosAnimal
      .listAnimalsByDonor()
      .then((response) => {
        setAnimals(response.results);
        setTotalPages(Math.ceil(response.count / 9));
      })
      .catch((error) => {
        setMessageError(error);
      });

    setLoading(false);
  }, [axiosAnimal]);

  const handlePageChange = React.useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setLoading(true);
      event.preventDefault();
      axiosAnimal
        .listAnimalsByDonor(value)
        .then((response) => {
          setAnimals(response.results);
          setPage(value);
        })
        .catch((error) => {
          setMessageError(error);
        });

      setLoading(false);
    },
    [axiosAnimal]
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
            <CardAnimal
              animal={animal}
              handleClick={() => {
                try {
                  navigate(`/animal/donor/${animal.id}`);
                } catch (error) {
                  console.log("error");
                }
              }}
            />
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
