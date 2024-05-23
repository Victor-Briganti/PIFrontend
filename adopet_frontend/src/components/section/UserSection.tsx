import * as React from "react";
import AvatarUser from "../elements/AvatarUser";
import SignButtons from "../elements/SignButtons";
import InterfaceUserCommon from "../../interfaces/InterfaceUserCommon";
import AxiosUser from "../../api/AxiosUser";

const axiosUser = new AxiosUser();

export default function UserSection() {
  const [user, setUser] = React.useState<InterfaceUserCommon | undefined>(
    undefined
  );

  React.useEffect(() => {
    axiosUser.getUserCommon().then((data: InterfaceUserCommon) => {
      setUser(data);
    });
  }, []);

  return user ? <AvatarUser user={user} /> : <SignButtons />;
}
