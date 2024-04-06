import * as React from 'react';
import * as MUI from '@mui/material';

function ActionAreaCard() {
  return (
    <MUI.Card sx={{ maxWidth: 345 }}>
      <MUI.CardActionArea>
        <MUI.CardMedia
          component="img"
          height="200"
          image="http://localhost:8000/animal/images/show/1"
          alt="dogo"
        />
        <MUI.CardContent>
          <MUI.Typography gutterBottom variant="h5" component="div">
            Dogo
          </MUI.Typography>
          <MUI.Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </MUI.Typography>
        </MUI.CardContent>
      </MUI.CardActionArea>
    </MUI.Card>
  );
}

export default function AnimalGrid() {
    return (
        <MUI.Grid container spacing={2}>
            {[...Array(9)].map((_, index) => (
                <MUI.Grid item xs={12} sm={6} md={4} key={index}>
                    <ActionAreaCard />
                </MUI.Grid>
            ))}
        </MUI.Grid>
    );
}