import * as React from "react";
import * as MuiMaterial from "@mui/material";
import Header from "./Header";
// import Copyright from "./CopyRight";
import Footer from "./Footer";

export default function Home() {
  return (
    <MuiMaterial.Box
      component="main"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      height={"100vh"}
    >
      <MuiMaterial.CssBaseline />
      <Header />
      <MuiMaterial.Box
        className="content"
        flexGrow={1}
        overflow={"scroll"}
        paddingY={10}
      >
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
        <MuiMaterial.Box>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          officiis quas magni eius sit fugiat quisquam ipsam, distinctio optio
          reiciendis nam vero tenetur iure beatae deleniti ad totam, pariatur
          sunt!
        </MuiMaterial.Box>
      </MuiMaterial.Box>
      <Footer />
      {/* <Copyright /> */}
    </MuiMaterial.Box>
  );
}
