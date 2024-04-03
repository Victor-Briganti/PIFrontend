import * as React from 'react';
import * as MuiMaterial from '@mui/material';

function ActionAreaCard() {
  return (
    <MuiMaterial.Card sx={{ maxWidth: 345 }}>
      <MuiMaterial.CardActionArea>
        <MuiMaterial.CardMedia
          component="img"
          height="200"
          image="http://localhost:8000/animal/images/show/1"
          alt="dogo"
        />
        <MuiMaterial.CardContent>
          <MuiMaterial.Typography gutterBottom variant="h5" component="div">
            Dogo
          </MuiMaterial.Typography>
          <MuiMaterial.Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </MuiMaterial.Typography>
        </MuiMaterial.CardContent>
      </MuiMaterial.CardActionArea>
    </MuiMaterial.Card>
  );
}

export default function AnimalGrid() {
    return (
        <MuiMaterial.Grid container spacing={2}>
            {[...Array(9)].map((_, index) => (
                <MuiMaterial.Grid item xs={12} sm={6} md={4} key={index}>
                    <ActionAreaCard />
                </MuiMaterial.Grid>
            ))}
        </MuiMaterial.Grid>
    );
}