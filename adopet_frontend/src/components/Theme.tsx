import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8128ad",
      light: "#8f4db0",
      dark: "#5a0e80",
    },
    secondary: {
      main: "#c4b584",
      light: "#bdb499",
      dark: "#baa157",
    },
  },
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
