import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8128ad",
      light: "#8f4db0",
      dark: "#5a0e80",
    },
    secondary: {
      main: "#90caf9",
      light: "#e3f2fd",
      dark: "#42a5f5",
    },
  },
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
