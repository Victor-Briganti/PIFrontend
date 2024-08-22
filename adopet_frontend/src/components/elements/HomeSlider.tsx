import * as MUI from "@mui/material";
import Carousel from "react-material-ui-carousel";
import InterfaceAnimal from "../../models/interfaces/animal/InterfaceAnimal";
import AxiosAnimal from "../../api/AxiosAnimal";
import * as React from "react";

interface SliderProps {
  animals: InterfaceAnimal[];
}

export default function SliderHome({ animals }: SliderProps) {
  const axiosAnimal = React.useMemo(() => new AxiosAnimal(), []);
  const [images, setImages] = React.useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = animals.map((animal) =>
        axiosAnimal.listImageById(animal.id!).then((response) => {
          if (response.length > 0 && response[0].image) {
            return { animalId: animal.id, imageUrl: response[0].image };
          }
          return { animalId: animal.id, imageUrl: null }; // Null for missing image
        })
      );

      const imageResults = await Promise.all(imagePromises);

      const imagesMap = imageResults.reduce((acc, curr) => {
        acc[curr.animalId!] = curr.imageUrl;
        return acc;
      }, {} as { [key: string]: string | null });

      setImages(imagesMap);
      setLoading(false);
    };

    fetchImages();
  }, [animals, axiosAnimal]);

  if (loading) {
    return <MUI.CircularProgress />;
  }

  return (
    <Carousel
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    >
      {animals.map((animal, index) => {
        const imageUrl = images[animal.id!];

        return (
          <MUI.Box
            key={index}
            sx={{
              width: "100%",
              height: "600px",
              objectFit: "contain",
              display: "grid",
              flexDirection: "column",
              quality: "full",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            {imageUrl ? (
              <MUI.CardMedia
                component="img"
                height="530px"
                image={imageUrl}
                alt={animal.name}
              />
            ) : (
              <MUI.Box
                sx={{
                  width: "100%",
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "lightgray",
                }}
              >
                <MUI.Typography variant="h6" color="text.secondary">
                  Image not available
                </MUI.Typography>
              </MUI.Box>
            )}
            <MUI.CardContent>
              <MUI.Typography gutterBottom variant="h5" component="div">
                {animal.name}
              </MUI.Typography>
            </MUI.CardContent>
          </MUI.Box>
        );
      })}
    </Carousel>
  );
}
