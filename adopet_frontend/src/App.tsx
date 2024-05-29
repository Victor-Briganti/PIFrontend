import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import "./App.css";
import Theme from "./components/styles/Theme";
import MainRouter from "./routers/MainRouter";
import UserContext from "./hooks/UserContext";
import InterfaceUser from "./models/interfaces/user/InterfaceUser";

export default function App() {
  const [user, setUser] = React.useState<InterfaceUser | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserContext.Provider value={{ context: user, setContext: setUser }}>
        <Theme>
          <div className="App">
            <MainRouter />
          </div>
        </Theme>
      </UserContext.Provider>
    </LocalizationProvider>
  );
}
