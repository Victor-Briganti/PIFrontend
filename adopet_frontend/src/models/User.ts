import UserCommon from "./UserCommon";
import UserMetadata from "./UserMetadata";

export default class User {
  private userCommon: UserCommon;
  private userMetadata: UserMetadata;

  constructor(userCommon: UserCommon, userMetadata: UserMetadata) {
    this.userCommon = userCommon;
    this.userMetadata = userMetadata;
  }

  getUserCommon(): UserCommon {
    return this.userCommon;
  }

  getUserMetadata(): UserMetadata {
    return this.userMetadata;
  }
}
