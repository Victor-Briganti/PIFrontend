import * as MUI from "@mui/material";
import * as React from "react";
import InterfaceAnimal from "../../interfaces/InterfaceAnimal";
import { useNavigate } from "react-router-dom";
import AxiosAnimal from "../../api/AxiosAnimal";

interface CardAnimalProps {
  animal: InterfaceAnimal;
}

const axiosAnimal = new AxiosAnimal();

export default function CardAnimal({ animal }: CardAnimalProps) {
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const navigate = useNavigate();

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
        });
    }

    const animalDesc = animal.description;
    if (animalDesc !== undefined) {
      setDescription(animalDesc);
    }
  }, [animal]);

  const handleClick = () => {
    try {
      navigate("/animalprofile", {
        state: { animal: animal },
      });
    } catch (error) {
      console.log("error");
    }
  };

  if (imageUrl === "") {
    return;
  }

  return (
    <MUI.Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <MUI.CardActionArea>
        <MUI.CardMedia component="img" height="250px" image={imageUrl} />
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
