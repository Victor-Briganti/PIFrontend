import * as MUI from "@mui/material";
import Carousel from "react-material-ui-carousel";

interface SliderProps {
  banners: string[];
}

export default function Slider({ banners }: SliderProps) {
  const hideDots = banners.length <= 1;

  return (
    <Carousel
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
      indicators={!hideDots}
      navButtonsAlwaysInvisible={hideDots}
    >
      {banners.map((banner, index) => (
        <MUI.Box
          key={index}
          component="img"
          sx={{
            width: "100%",
            height: "500px",
            objectFit: "contain",
          }}
          src={banner}
          alt={`Slide ${index}`}
        />
      ))}
    </Carousel>
  );
}
