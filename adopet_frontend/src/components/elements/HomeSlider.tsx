import * as MUI from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

interface SliderProps {
  banners: string[];
  links : string[];
}

export default function Slider({ banners,links }: SliderProps) {
  const hideDots = banners.length <= 1;

  return (
    <MUI.Box sx={{ position: "relative", padding: "10px 0" }}>
      <Carousel
        sx={{
          width: "200vh",
          height: "100%",
          objectFit: "cover",
          margin: 0,
          padding: 0,
        }}
        indicators={!hideDots}
        navButtonsAlwaysInvisible={hideDots}
      >
        {banners.map((banner, index) => (
        <Link to ={links[index] || "#" } key = {index} style = {{textDecoration: 'none'}}>  
          <MUI.Box
            key={index}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              border: "2px solid #f0f0f0",
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
              position: "relative",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
              "&:hover .banner-image-overlay": {
                opacity: 0.5,
              },
              "&:hover .banner-image": {
                filter: "brightness(1.1)",
              },
            }}
          >
            <MUI.Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transition: "filter 0.3s ease-in-out",
                transform: "scale(1.06)",
                borderRadius: "10px",
              }}
              src={banner}
              alt={`Slide ${index}`}
              className="banner-image"
            />
            <MUI.Box
              className="banner-image-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
                borderRadius: "10px",
              }}
            />
          </MUI.Box>
        </Link>
        ))}
      </Carousel>
    </MUI.Box>
  );
}
