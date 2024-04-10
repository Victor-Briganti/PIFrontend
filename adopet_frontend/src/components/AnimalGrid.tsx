import * as React from "react";
import * as MUI from "@mui/material";
import AxiosAnimal from "./api/AxiosAnimal";
import { Animal } from "./models/Animal";

const axiosAnimal = new AxiosAnimal();

function AnimalCard({ animal }: { animal: Animal }) {
  const [imageUrl, setImageUrl] = React.useState("");

  React.useEffect(() => {
    if (animal.id) {
      axiosAnimal
        .listImagesById(animal.id)
        .then((response) => {
          setImageUrl(response[0].image);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [animal.id]);

  return (
    <MUI.Card sx={{ maxWidth: 345 }}>
      <MUI.CardActionArea>
        <MUI.CardMedia component="img" height="200" image={imageUrl} />
        <MUI.CardContent>
          <MUI.Typography gutterBottom variant="h5" component="div">
            {animal.name}
          </MUI.Typography>
          <MUI.Typography variant="body2" color="text.secondary">
            {animal.description}
          </MUI.Typography>
        </MUI.CardContent>
      </MUI.CardActionArea>
    </MUI.Card>
  );
}

export default function AnimalGrid() {
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
        setTotalPages(Math.ceil(response.count / 10));
        console.log(response.count);
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
    <MUI.Container component="main" maxWidth="xs">
      <MUI.CssBaseline />

      <MUI.Grid container spacing={3}>
        {animals.map((animal: Animal) => (
          <MUI.Grid item key={animal.id} xs={4}>
            <AnimalCard animal={animal} />
          </MUI.Grid>
        ))}
      </MUI.Grid>

      {totalPages && (
        <MUI.Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </MUI.Container>
  );
}
