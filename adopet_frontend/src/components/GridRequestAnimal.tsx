import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosDonor from "../api/AxiosDonor";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import PageNumber from "./elements/PageNumber";
import CardAnimal from "./elements/cards/CardAnimal";

export default function GridRequestAnimal() {
  const [messageError, setMessageError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [animals, setAnimals] = React.useState([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const axiosDonor = React.useMemo(() => new AxiosDonor(), []);
  const navigate = Router.useNavigate();

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
      <MUI.Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        paddingTop={"15%"}
      >
        <MUI.Typography variant={"h3"}>
          <b>Carregando.</b>
        </MUI.Typography>
      </MUI.Box>
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
          <b>O animal não pode ser carregado.</b>
        </MUI.Typography>
      </MUI.Box>
    );
  }

  if (animals.length === 0) {
    return (
      <MUI.Box
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
        paddingTop={"15%"}
      >
        <MUI.Typography variant={"h3"}>
          <b>Não há animais para serem mostrados.</b>
        </MUI.Typography>
      </MUI.Box>
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
