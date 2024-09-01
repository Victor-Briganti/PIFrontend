import * as MUI from "@mui/material";
import Carousel from "react-material-ui-carousel";
import InterfaceAnimal from "../../models/interfaces/animal/InterfaceAnimal";
import AxiosAnimal from "../../api/AxiosAnimal";
import * as React from "react";
import { Link } from "react-router-dom";

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
    <MUI.Box sx={{ position: "relative", padding: "10px 0" }}>
      {/* Title Section */}
      <MUI.Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#6A1B9A", // Darker shade of purple
          padding: "10px 0",
          marginBottom: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        Animais Recentes
      </MUI.Typography>

      {/* Carousel Section */}
      <Carousel
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          margin: 0,
          padding: 0,
        }}
      >
        {animals.map((animal, index) => {
          const imageUrl = images[animal.id!];

          return (
          <Link to ={`/animal/${animal.id}`} key={index} style={{ textDecoration: 'none' }}>
            <MUI.Box
              key={index}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "full",
                alignItems: "center",
                backgroundColor: "#f9f9f9", // Light background for contrast
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                borderRadius: "10px",
                overflow: "hidden",
                border: "2px solid #f0f0f0", // Light border around the box
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                position: "relative", // Necessary for positioning the name
                  '&:hover': {
                    transform: "translateY(-5px)", // Slight lift on hover
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
                  },
                  '&:hover .animal-image-overlay': {
                    opacity: 0.5, // Show gradient overlay on hover
                  },
                  '&:hover .animal-image': {
                    filter: "brightness(1.1)", // Slightly brighten the image
                  },
                  '&:hover .animal-name': {
                    opacity: 1, // Make the name visible on hover
                  },
                }}
                >
              {imageUrl ? (
                <>
                <MUI.CardMedia
                  component="img"
                  height="550px"
                  image={imageUrl}
                  alt={animal.name} 
                  className = "animal-image"
                  sx={{
                    aspectRatio: "16 / 9", // Aspect ratio for the image
                    transform: "scale(1.06)", // Slightly zoom in the image
                    borderRadius: "10px",
                    transition: "filter 0.3s ease-in-out", // Smooth transition for brightness
                  }}
                />
                <MUI.Box
                  className="animal-image-overlay"
                  sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
                  opacity: 0, // Hidden by default
                  transition: "opacity 0.3s ease-in-out", // Smooth transition
                  borderRadius: "10px",
                 }}
                />
              </>
              ) : (
                <MUI.Box
                  sx={{
                    width: "100%",
                    height: "100%",
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
                  className="animal-name"
                  sx={{
                    // backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
                    color: "white", // Text color
                    padding: "10px 20px",
                    borderRadius: "5px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                    position: "absolute",
                    bottom: "20px", // 20px from the bottom
                    left: "20px", // 20px from the left
                    textAlign: "center",
                    opacity: 0, // Hidden by default
                    transition: "opacity 0.5s ease-in-out", // Smooth transition
                  }}
                >
                  {animal.name}
                </MUI.Typography>

              </MUI.CardContent>
            </MUI.Box>
            </Link>
          );
        })}
      </Carousel>
    </MUI.Box>
  );
}
