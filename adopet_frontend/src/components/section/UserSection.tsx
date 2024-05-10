import * as React from "react";
import AvatarUser from "../elements/AvatarUser";
import SignButtons from "../elements/SignButtons";
import ModelUserCommon from "../../models/UserCommon";
import AxiosUser from "../../api/AxiosUser";

const axiosUser = new AxiosUser();

export default function UserSection() {
  const [user, setUser] = React.useState<ModelUserCommon | null>(null);

  React.useEffect(() => {
    axiosUser.getUserCommon().then((data: ModelUserCommon) => {
      setUser(data);
    });
  }, []);

  return user ? <AvatarUser user={user} /> : <SignButtons />;
}
