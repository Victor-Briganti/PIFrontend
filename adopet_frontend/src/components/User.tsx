import * as React from "react";
import * as MuiMaterial from "@mui/material";
import UserView from "./forms/UserView";

const defaultTheme = MuiMaterial.createTheme();

export default function User() {
  const userView = new UserView();
  userView.send();
  
  return (
    <MuiMaterial.ThemeProvider theme={defaultTheme}></MuiMaterial.ThemeProvider>
  );
}

// const bull = (
//     <MuiMaterial.Box
//       component="span"
//       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//       •
//     </MuiMaterial.Box>
//   );

// export default function UserView() {
//   return (
//     <MuiMaterial.ThemeProvider theme={defaultTheme}>
//       <MuiMaterial.Card sx={{ minWidth: 275 }}>
//         <MuiMaterial.CardContent>
//           <MuiMaterial.Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//             Word of the Day
//           </MuiMaterial.Typography>
//           <MuiMaterial.Typography variant="h5" component="div">
//             be{bull}nev{bull}o{bull}lent
//           </MuiMaterial.Typography>
//           <MuiMaterial.Typography sx={{ mb: 1.5 }} color="text.secondary">
//             adjective
//           </MuiMaterial.Typography>
//           <MuiMaterial.Typography variant="body2">
//             well meaning and kindly.
//             <br />
//             {'"a benevolent smile"'}
//           </MuiMaterial.Typography>
//         </MuiMaterial.CardContent>
//         <MuiMaterial.CardActions>
//           <MuiMaterial.Button size="small">Learn More</MuiMaterial.Button>
//         </MuiMaterial.CardActions>
//       </MuiMaterial.Card>
//     </MuiMaterial.ThemeProvider>
//   );
// }
