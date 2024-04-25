import * as MUI from "@mui/material";

export default function Content({ children }) {
  return (
    <MUI.Container
      className="content"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        bgcolor: "background.paper",
        color: "text.primary",
        padding: 2,
        borderRadius: 1,
        marginTop: "auto",
        marginBottom: "auto",
        paddingTop: "100px",
        paddingBottom: "20px",
        flexGrow: 1,
      }}
    >
      {children}
    </MUI.Container>
  );
}
