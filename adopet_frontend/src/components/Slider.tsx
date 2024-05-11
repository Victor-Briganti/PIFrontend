import * as MUI from "@mui/material";
import Carousel from "react-material-ui-carousel";

interface SliderProps {
  banners: string[];
}

export default function Slider({ banners }: SliderProps) {
  return (
    <Carousel
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    >
      {banners.map((banner, index) => (
        <MUI.Box
          key={index}
          component="img"
          sx={{
            width: "100%",
            height: "700px",
            objectFit: "cover",
          }}
          src={banner}
          alt={`Slide ${index}`}
        />
      ))}
    </Carousel>
  );
}
