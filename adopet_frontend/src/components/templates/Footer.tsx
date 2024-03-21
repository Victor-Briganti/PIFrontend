import React from "react";
import { Typography, Link, BottomNavigation } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "absolute",
        bottom: "0",
        background: "#282c34",
        color: "white",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      <footer>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, et
          ullam incidunt reiciendis in quas ducimus sint vero ipsum assumenda
          quisquam! Odio iste, fugit molestiae atque placeat et eos laudantium.
        </div>
        <br></br>
        <Copyright />
      </footer>
    </BottomNavigation>
  );
}

export default Footer;
