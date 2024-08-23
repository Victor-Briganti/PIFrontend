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
    //caixa de texto acima do animal
    <MUI.Box sx={{ position: "relative" }}>
      <MUI.Typography
        variant="h4"
        sx={{
          position: "relative",
          top: "10px",
          left: "50%",
          // transform: "translate(-50%,-20%)", 2 opcao
          transform: "translate(-50%,1197%)",
          zIndex: 10,
          backgroundColor: "rgba(129, 40, 173, 1)",
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          // borderBottomLeftRadius: 0, 2 opcao
          // borderBottomRightRadius: 0, 2 opcao
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        Animais Recentes
      </MUI.Typography>
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
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                borderBottomLeftRadius: 0, // 1 opcao
                borderBottomRightRadius: 0, // 1 opcao
                // borderTopLeftRadius: 0, //2 opcao
                // borderTopRightRadius: 0, // 2 opcao 
                overflow: "hidden",
                paddingBottom: 0,
                marginBottom: 0,
                position: "relative", // Necessary for positioning the name
                '&:hover .animal-name': {
                  opacity: 1, // Make the name visible on hover
                }
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
                    transform: "scale(1.06)",
                    transition: "transform 0.5s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.10)",

                    },
                  }}
                />
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
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
                color: "white", // Text color
                // width: "100%", // Full width
                padding: "5px 10px", 
                borderRadius: "5px", 
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", 
                position: "absolute", 
                bottom: "100px", 
                left: "100%",
                transform: "translate(-100%,215%)", 
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
