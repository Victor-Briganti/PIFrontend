import * as MUI from "@mui/material";

export default function AnimalCardError() {
  return (
    <MUI.Card sx={{ maxWidth: 345 }}>
      <MUI.CardActionArea>
        <MUI.CardMedia
          component="img"
          height="250px"
          image={"src/assets/logo.png"}
        />
        <MUI.CardContent>
          <MUI.Alert severity="error">
            Este animal não pode ser carregado
          </MUI.Alert>
        </MUI.CardContent>
      </MUI.CardActionArea>
    </MUI.Card>
  );
}
