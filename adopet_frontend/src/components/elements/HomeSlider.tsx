import * as MUI from "@mui/material";
import Carousel from "react-material-ui-carousel";
import InterfaceAnimal from "../../models/interfaces/animal/InterfaceAnimal";
import AxiosAnimal from "../../api/AxiosAnimal";
import * as React from "react";

interface SliderProps {
  banners: string[];
  animals: InterfaceAnimal[];
}

export default function SliderHome({ banners, animals }: SliderProps) {
  const axiosAnimal = React.useMemo(() => new AxiosAnimal(), []);
  const [images, setImages] = React.useState<{ [key: string]: string }>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = animals.map((animal) =>
        axiosAnimal.listImageById(animal.id!).then((response) => {
          if (response.length > 0 && response[0].image) {
            return { animalId: animal.id, imageUrl: response[0].image };
          }
          return { animalId: animal.id, imageUrl: "default_image.png" }; // Fallback
        })
      );

      const imageResults = await Promise.all(imagePromises);

      const imagesMap = imageResults.reduce((acc, curr) => {
        acc[curr.animalId!] = curr.imageUrl;
        return acc;
      }, {} as { [key: string]: string });

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
      {animals.length > 0 ? (
        animals.map((animal, index) => (
          <MUI.Box
            key={index}
            sx={{
              width: "100%",
              height: "700px",
              objectFit: "contain",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <MUI.CardMedia
              component="img"
              height="400"
              image={images[animal.id!] || "default_image.png"} // Use the image fetched or a default
              alt={animal.name}
            />
            <MUI.CardContent>
              <MUI.Typography gutterBottom variant="h5" component="div">
                {animal.name}
              </MUI.Typography>
              <MUI.Typography variant="body2" color="text.secondary">
                {animal.description}
              </MUI.Typography>
            </MUI.CardContent>
          </MUI.Box>
        ))
      ) : (
        banners.map((banner, index) => (
          <MUI.Box
            key={index}
            component="img"
            sx={{
              width: "100%",
              height: "700px",
              objectFit: "contain",
            }}
            src={banner}
            alt={`Banner ${index + 1}`}
          />
        ))
      )}
    </Carousel>
  );
}
