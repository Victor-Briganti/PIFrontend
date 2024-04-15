import * as MUI from "@mui/material";

export default function Content({ children }) {
  return (
    <MUI.Grid
      container
      top={0}
      direction="column"
      alignItems="center"
      marginTop={10}
      marginBottom={6}
      maxWidth={"90%"}
    >
      <MUI.Grid item xs={12}>
        {children}
      </MUI.Grid>
    </MUI.Grid>
  );
}
