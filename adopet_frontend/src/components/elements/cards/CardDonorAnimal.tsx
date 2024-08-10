import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import InterfaceAnimal from "../../../models/interfaces/animal/InterfaceAnimal";
import AxiosAnimal from "../../../api/AxiosAnimal";

interface CardDonorAnimalProps {
  animal: InterfaceAnimal;
}

export default function CardDonorAnimal({ animal }: CardDonorAnimalProps) {
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const axiosAnimal = React.useMemo(() => new AxiosAnimal(), []);
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    const animalId = animal.id;

    if (animalId !== undefined) {
      axiosAnimal
        .listImageById(animalId)
        .then((response) => {
          const image = response[0].image;
          if (typeof image === "string") {
            setImageUrl(image);
          } else {
            throw new Error("Imagem deve ser um link");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    const animalDesc = animal.description;
    if (animalDesc !== undefined) {
      setDescription(animalDesc);
    }
  }, [animal, axiosAnimal]);

  const handleClick = React.useCallback(() => {
    try {
      navigate(`/animal/donor/${animal.id}`);
    } catch (error) {
      console.log("error");
    }
  }, [animal, navigate]);

  if (loading || imageUrl === "") {
    return (
      <MUI.Card sx={{ maxWidth: 345 }}>
        <MUI.CardActionArea>
          <MUI.Skeleton variant="rectangular" width="100%" height={250} />
          <MUI.CardContent>
            <MUI.Skeleton variant="text" />
            <MUI.Skeleton variant="text" />
          </MUI.CardContent>
        </MUI.CardActionArea>
      </MUI.Card>
    );
  }

  return (
    <MUI.Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <MUI.CardActionArea>
        <MUI.CardMedia component="img" height="250px" image={imageUrl} />
        <MUI.Box position={"absolute"} width={"350px"} bottom={"92.5px"}>
          <MUI.Typography variant="h5" component="div" sx={{backgroundColor: 'rgba(129, 40, 173, 0.9)'}} color={"white"}>
            {animal.is_adopted ? "Adotado" : ""}
          </MUI.Typography>
        </MUI.Box>
        <MUI.CardContent>
          <MUI.Typography gutterBottom variant="h5" component="div">
            {animal.name}
          </MUI.Typography>
          {description && description.length > 90 ? (
            <MUI.Typography variant="body2" color="text.secondary">
              {description.slice(0, 90)}..
            </MUI.Typography>
          ) : (
            <MUI.Typography variant="body2" color="text.secondary">
              {description}
            </MUI.Typography>
          )}
        </MUI.CardContent>
      </MUI.CardActionArea>
    </MUI.Card>
  );
}
