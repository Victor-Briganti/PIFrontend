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
    <MUI.Box sx={{ position: "relative" }}>
      <MUI.Typography
        variant="h4"
        sx={{
          position: "relative",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(129, 40, 173, 0.8)",
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        Animais Já Adotados
      </MUI.Typography>
      <Carousel
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
                quality: "full",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              {imageUrl ? (
                <MUI.CardMedia
                  component="img"
                  height="580px"
                  image={imageUrl}
                  alt={animal.name}
                  sx={{
                    borderRadius: "10px",
                    transition: "transform 0.5s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
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
              <MUI.Typography
              variant="h4" 
              component="div"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
                color: "white", // Text color
                padding: "10px 20px", 
                borderRadius: "5px", 
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", 
                position: "absolute", 
                bottom: "100px", 
                left: "100%",
                transform: "translate(-100%,215%)", 
                textAlign: "center", 
              }}
            >
              {animal.name}
            </MUI.Typography>

              </MUI.CardContent>
            </MUI.Box>
          );
        })}
      </Carousel>
    </MUI.Box>
  );
}
