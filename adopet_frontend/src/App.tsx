import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import Theme from "./components/styles/Theme";
import MainRouter from "./routers/MainRouter";

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Theme>
        <div className="App">
          <MainRouter />
        </div>
      </Theme>
    </LocalizationProvider>
  );
}
