import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function Footer() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        position: "static",
        bottom: "0%",
        marginX: "0px",
        padding: 3,
        backgroundColor: "black",
        width: "100%",
      }}
    >
      <Grid item xs={8}>
        <Paper>xs=8</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>xs=4</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>xs=4</Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper>xs=8</Paper>
      </Grid>
    </Grid>
  );
}
