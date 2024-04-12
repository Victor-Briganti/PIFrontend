import * as React from "react";
import * as MUI from "@mui/material";
// import { MUI.Box } from "@mui/material";
import Header from "./Header";
// import Copyright from "./CopyRight";
import Footer from "./Footer";

export default function Home() {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      height={"100vh"}
    >
      <MUI.CssBaseline />
      <Header />
      <MUI.Box className="content" paddingY={10}>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
        <MUI.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MUI.Box>
      </MUI.Box>
      <Footer />
    </MUI.Box>
  );
}
