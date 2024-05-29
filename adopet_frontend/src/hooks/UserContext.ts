import * as React from "react";
import InterfaceContext from "../models/interfaces/InterfaceContext";
import InterfaceUserCommon from "../models/interfaces/user/InterfaceUserCommon";

const UserContext = React.createContext<InterfaceContext<InterfaceUserCommon>>({
  context: null,
  setContext: () => {},
});

export default UserContext;
